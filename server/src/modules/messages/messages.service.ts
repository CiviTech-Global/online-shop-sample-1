import { SmsStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma.js";
import { BadRequestError, NotFoundError } from "../../shared/app-error.js";
import type { UpdateTemplateBody, SendSmsBody, RecoverAbandonedBody } from "./messages.types.js";

const DEFAULT_SITE_NAME = "نمونه فروشگاه آنلاین";

async function getSiteName(): Promise<string> {
  const setting = await prisma.setting.findUnique({ where: { key: "site_name" } });
  return setting?.value ?? DEFAULT_SITE_NAME;
}

function renderTemplate(body: string, variables: Record<string, string | number>): string {
  return body.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => String(variables[key] ?? ""));
}

export async function listTemplates() {
  const templates = await prisma.smsTemplate.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
  });
  return { templates };
}

export async function getTemplate(key: string) {
  const template = await prisma.smsTemplate.findUnique({ where: { key } });
  if (!template) {
    throw new NotFoundError("SmsTemplate");
  }
  return { template };
}

export async function updateTemplate(key: string, data: UpdateTemplateBody) {
  await getTemplate(key);
  const template = await prisma.smsTemplate.update({
    where: { key },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.body !== undefined && { body: data.body }),
      ...(data.variables !== undefined && { variables: data.variables }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  });
  return { template };
}

export async function sendSms(payload: SendSmsBody) {
  const siteName = await getSiteName();
  const rendered = payload.template
    ? await renderTemplateMessage(payload.template, { siteName, message: payload.message })
    : payload.message;

  const log = await prisma.smsNotification.create({
    data: {
      phone: payload.phone,
      message: rendered,
      template: payload.template ?? null,
      status: SmsStatus.SENT,
      sentAt: new Date(),
      providerResponse: { mode: "simulator", note: "No real SMS provider configured" },
    },
  });

  return { sent: true, log };
}

async function renderTemplateMessage(templateKey: string, variables: Record<string, string | number>) {
  const template = await prisma.smsTemplate.findUnique({ where: { key: templateKey } });
  if (!template || !template.isActive) {
    throw new BadRequestError("قالب پیامک یافت نشد یا غیرفعال است");
  }
  return renderTemplate(template.body, variables);
}

const statusLabels: Record<string, string> = {
  PENDING: "در انتظار پرداخت",
  PROCESSING: "در حال پردازش",
  SHIPPED: "ارسال شده",
  DELIVERED: "تحویل داده شده",
  CANCELLED: "لغو شده",
};

export async function sendOrderUpdate(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: { select: { id: true, phone: true } }, shippingAddress: { select: { phone: true } } },
  });

  if (!order) {
    throw new NotFoundError("Order");
  }

  const phone = order.user?.phone ?? order.shippingAddress?.phone;
  if (!phone) {
    throw new BadRequestError("سفارش فاقد شماره موبایل است");
  }

  const siteName = await getSiteName();
  const message = await renderTemplateMessage("order_status_changed", {
    siteName,
    orderNumber: order.orderNumber,
    status: statusLabels[order.status] ?? order.status,
    trackingNumber: order.trackingNumber ?? "-",
  });

  const log = await prisma.smsNotification.create({
    data: {
      userId: order.userId ?? null,
      phone,
      message,
      template: "order_status_changed",
      status: SmsStatus.SENT,
      sentAt: new Date(),
      providerResponse: { mode: "simulator", orderId: order.id },
    },
  });

  return { sent: true, log };
}

export async function recoverAbandonedCarts(payload: RecoverAbandonedBody) {
  const threshold = new Date(Date.now() - payload.hours * 60 * 60 * 1000);
  const carts = await prisma.cart.findMany({
    where: {
      status: "ACTIVE",
      updatedAt: { lt: threshold },
      items: { some: {} },
      OR: [{ userId: { not: null } }, { sessionId: { not: null } }],
    },
    include: {
      user: { select: { id: true, phone: true } },
      items: { select: { id: true } },
    },
    take: payload.maxMessages,
    orderBy: { updatedAt: "asc" },
  });

  const siteName = await getSiteName();
  const template = await prisma.smsTemplate.findUnique({ where: { key: "abandoned_cart" } });
  if (!template || !template.isActive) {
    throw new BadRequestError("قالب پیامک سبد رها شده یافت نشد یا غیرفعال است");
  }

  const sentPhones = new Set<string>();
  let sentCount = 0;

  for (const cart of carts) {
    const phone = cart.user?.phone;
    if (!phone || sentPhones.has(phone)) {
      continue;
    }

    const message = renderTemplate(template.body, {
      siteName,
      cartCode: cart.id.slice(0, 8).toUpperCase(),
    });

    await prisma.smsNotification.create({
      data: {
        userId: cart.userId ?? null,
        phone,
        message,
        template: "abandoned_cart",
        status: SmsStatus.SENT,
        sentAt: new Date(),
        providerResponse: { mode: "simulator", cartId: cart.id },
      },
    });

    await prisma.cart.update({
      where: { id: cart.id },
      data: { status: "RECOVERED" },
    });

    sentPhones.add(phone);
    sentCount++;
  }

  return { scanned: carts.length, sent: sentCount };
}

export async function listLogs(query: { take?: number; skip?: number } = {}) {
  const take = Math.min(query.take ?? 50, 100);
  const skip = query.skip ?? 0;

  const [logs, total] = await Promise.all([
    prisma.smsNotification.findMany({
      take,
      skip,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, phone: true, firstName: true, lastName: true } } },
    }),
    prisma.smsNotification.count(),
  ]);

  return { logs, pagination: { total, take, skip } };
}

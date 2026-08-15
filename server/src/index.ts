import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { env } from "./config/env.js";
import { prisma } from "./shared/prisma.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import settingsRoutes from "./modules/settings/settings.routes.js";
import homepageSectionRoutes from "./modules/homepage-sections/homepage-section.routes.js";
import demoRoutes from "./modules/demo/demo.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import messagesRoutes from "./modules/messages/messages.routes.js";

const app = Fastify({
  logger: {
    level: env.NODE_ENV === "production" ? "info" : "debug",
  },
});

async function bootstrap(): Promise<void> {
  await app.register(cors, {
    origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN.split(","),
    credentials: true,
  });

  await app.register(jwt, {
    secret: env.JWT_SECRET,
  });

  await app.register(multipart, {
    limits: {
      fileSize: env.MAX_FILE_SIZE,
    },
  });

  app.get("/health", async (_request, reply) => {
    return reply.status(200).send({
      success: true,
      data: { status: "ok", timestamp: new Date().toISOString() },
    });
  });

  app.get("/sitemap.xml", async (_request, reply) => {
    const baseUrl = env.NODE_ENV === "production" ? "https://example.com" : "http://localhost:5173";
    const [products, categories] = await Promise.all([
      prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
      prisma.category.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    ]);

    const staticUrls = ["", "/products", "/categories", "/about", "/contact", "/rules"];
    const urls: string[] = [];

    for (const path of staticUrls) {
      urls.push(`<url><loc>${baseUrl}${path}</loc><changefreq>daily</changefreq><priority>${path === "" ? "1.0" : "0.7"}</priority></url>`);
    }
    for (const product of products) {
      urls.push(
        `<url><loc>${baseUrl}/products/${product.slug}</loc><lastmod>${product.updatedAt.toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
      );
    }
    for (const category of categories) {
      urls.push(
        `<url><loc>${baseUrl}/categories/${category.slug}</loc><lastmod>${category.updatedAt.toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
    return reply.type("application/xml").send(xml);
  });

  await app.register(categoryRoutes, { prefix: `${env.API_PREFIX}/categories` });
  await app.register(productRoutes, { prefix: `${env.API_PREFIX}/products` });
  await app.register(authRoutes, { prefix: `${env.API_PREFIX}/auth` });
  await app.register(orderRoutes, { prefix: `${env.API_PREFIX}/orders` });
  await app.register(paymentRoutes, { prefix: `${env.API_PREFIX}/payments` });
  await app.register(adminRoutes, { prefix: `${env.API_PREFIX}/admin` });
  await app.register(settingsRoutes, { prefix: `${env.API_PREFIX}/settings` });
  await app.register(homepageSectionRoutes, { prefix: `${env.API_PREFIX}/homepage-sections` });
  await app.register(demoRoutes, { prefix: `${env.API_PREFIX}/demo` });
  await app.register(dashboardRoutes, { prefix: `${env.API_PREFIX}/dashboard` });
  await app.register(messagesRoutes, { prefix: `${env.API_PREFIX}/messages` });

  app.setErrorHandler((error, _request, reply) => {
    const err = error instanceof Error ? error : new Error(String(error));
    const statusCode =
      "statusCode" in err && typeof err.statusCode === "number" ? err.statusCode : 500;
    const code = "code" in err && typeof err.code === "string" ? err.code : "INTERNAL_ERROR";
    const details =
      "details" in err && err.details !== undefined ? err.details : undefined;
    return reply.status(statusCode).send({
      success: false,
      error: {
        code,
        message: err.message,
        ...(details ? { details } : {}),
      },
    });
  });

  await app.listen({ port: env.PORT, host: env.HOST });
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

export { app };

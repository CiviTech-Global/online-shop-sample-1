import type { FastifyReply, FastifyRequest } from "fastify";
import { sendSuccess } from "../../shared/reply.js";
import { asyncHandler } from "../../shared/async-handler.js";
import * as messagesService from "./messages.service.js";
import type {
  TemplateParams,
  UpdateTemplateBody,
  SendSmsBody,
  RecoverAbandonedBody,
  OrderParams,
} from "./messages.types.js";

export const listTemplates = asyncHandler(
  async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await messagesService.listTemplates();
    sendSuccess(reply, result);
  }
);

export const getTemplate = asyncHandler(
  async (request: FastifyRequest<{ Params: TemplateParams }>, reply: FastifyReply): Promise<void> => {
    const result = await messagesService.getTemplate(request.params.key);
    sendSuccess(reply, result);
  }
);

export const updateTemplate = asyncHandler(
  async (
    request: FastifyRequest<{ Params: TemplateParams; Body: UpdateTemplateBody }>,
    reply: FastifyReply
  ): Promise<void> => {
    const result = await messagesService.updateTemplate(request.params.key, request.body);
    sendSuccess(reply, result);
  }
);

export const sendSms = asyncHandler(
  async (request: FastifyRequest<{ Body: SendSmsBody }>, reply: FastifyReply): Promise<void> => {
    const result = await messagesService.sendSms(request.body);
    sendSuccess(reply, result, 201);
  }
);

export const sendOrderUpdate = asyncHandler(
  async (request: FastifyRequest<{ Params: OrderParams }>, reply: FastifyReply): Promise<void> => {
    const result = await messagesService.sendOrderUpdate(request.params.id);
    sendSuccess(reply, result, 201);
  }
);

export const recoverAbandonedCarts = asyncHandler(
  async (request: FastifyRequest<{ Body: RecoverAbandonedBody }>, reply: FastifyReply): Promise<void> => {
    const result = await messagesService.recoverAbandonedCarts(request.body);
    sendSuccess(reply, result, 201);
  }
);

export const listLogs = asyncHandler(
  async (
    request: FastifyRequest<{ Querystring: { take?: string; skip?: string } }>,
    reply: FastifyReply
  ): Promise<void> => {
    const result = await messagesService.listLogs({
      take: request.query.take ? Number(request.query.take) : undefined,
      skip: request.query.skip ? Number(request.query.skip) : undefined,
    });
    sendSuccess(reply, result);
  }
);

import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authenticate, authorize } from "../../shared/middleware/auth.js";
import { validateRequest } from "../../shared/middleware/validate-request.js";
import * as messagesController from "./messages.controller.js";
import {
  templateParamsSchema,
  updateTemplateSchema,
  sendSmsBodySchema,
  recoverAbandonedBodySchema,
  orderParamsSchema,
} from "./messages.types.js";

export default async function messagesRoutes(
  app: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> {
  app.get(
    "/templates",
    { preHandler: [authenticate, authorize("ADMIN")] },
    messagesController.listTemplates
  );

  app.get(
    "/templates/:key",
    { preHandler: [authenticate, authorize("ADMIN"), validateRequest({ params: templateParamsSchema })] },
    messagesController.getTemplate
  );

  app.patch(
    "/templates/:key",
    {
      preHandler: [
        authenticate,
        authorize("ADMIN"),
        validateRequest({ params: templateParamsSchema, body: updateTemplateSchema }),
      ],
    },
    messagesController.updateTemplate
  );

  app.post(
    "/send",
    {
      preHandler: [
        authenticate,
        authorize("ADMIN"),
        validateRequest({ body: sendSmsBodySchema }),
      ],
    },
    messagesController.sendSms
  );

  app.post(
    "/orders/:id/send-update",
    {
      preHandler: [
        authenticate,
        authorize("ADMIN"),
        validateRequest({ params: orderParamsSchema }),
      ],
    },
    messagesController.sendOrderUpdate
  );

  app.post(
    "/abandoned-cart/recover",
    {
      preHandler: [
        authenticate,
        authorize("ADMIN"),
        validateRequest({ body: recoverAbandonedBodySchema }),
      ],
    },
    messagesController.recoverAbandonedCarts
  );

  app.get(
    "/logs",
    { preHandler: [authenticate, authorize("ADMIN")] },
    messagesController.listLogs
  );
}

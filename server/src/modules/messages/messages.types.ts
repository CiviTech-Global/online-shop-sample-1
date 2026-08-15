import { z } from "zod";

export const templateParamsSchema = z.object({
  key: z.string().min(1),
});

export const updateTemplateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  body: z.string().min(1).optional(),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export const sendSmsBodySchema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  message: z.string().min(1).max(1000),
  template: z.string().max(100).optional(),
});

export const recoverAbandonedBodySchema = z.object({
  hours: z.coerce.number().int().min(1).max(72).default(24),
  maxMessages: z.coerce.number().int().min(1).max(100).default(50),
});

export const orderParamsSchema = z.object({
  id: z.string().uuid(),
});

export type TemplateParams = z.infer<typeof templateParamsSchema>;
export type UpdateTemplateBody = z.infer<typeof updateTemplateSchema>;
export type SendSmsBody = z.infer<typeof sendSmsBodySchema>;
export type RecoverAbandonedBody = z.infer<typeof recoverAbandonedBodySchema>;
export type OrderParams = z.infer<typeof orderParamsSchema>;

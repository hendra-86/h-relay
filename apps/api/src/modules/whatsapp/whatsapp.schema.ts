import { z } from 'zod';

export const WhatsappSendSchema = z.object({
  phone: z
    .string()
    .min(10)
    .max(20),

  message: z
    .string()
    .min(1)
    .max(4096),

  priority: z
    .number()
    .int()
    .min(1)
    .max(10)
    .optional(),
});

export type WhatsappSendDto = z.infer<
  typeof WhatsappSendSchema
>;
import { z } from 'zod';

export const ValidationTestSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone minimal 10 karakter'),

  message: z
    .string()
    .min(1, 'Message wajib diisi'),
});
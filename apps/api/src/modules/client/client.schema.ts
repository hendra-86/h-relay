import { z } from 'zod';

export const ClientIdSchema = z.object({
  id: z.string().min(1),
});
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum([
    'development',
    'production',
    'test',
  ]).default('development'),

  PORT: z.coerce.number().default(3000),

  API_PREFIX: z.string().default('/api/v1'),

  LOG_LEVEL: z.enum([
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal',
  ]).default('info'),
});

export type Env = z.infer<typeof envSchema>;
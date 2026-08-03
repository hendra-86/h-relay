import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().default(3000),

  API_PREFIX: z.string().default('/api/v1'),

  SERVICE_NAME: z.string().default('h-relay-api'),

  DATABASE_URL: z.url(),

  REDIS_HOST: z.string().default('localhost'),

  REDIS_PORT: z.coerce.number().default(6379),

  REDIS_PASSWORD: z.string().optional(),

  REDIS_DB: z.coerce.number().default(0),
});

export type Env = z.infer<typeof envSchema>;
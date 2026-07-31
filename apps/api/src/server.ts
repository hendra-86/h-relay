import app from './app.js';
import { env } from './config/env.js';
import { logger } from '@h-relay/logger';

const server = app.listen(env.PORT, () => {
  logger.info({
    service: 'h-relay-api',
    env: env.NODE_ENV,
    port: env.PORT,
  }, `🚀 H-Relay API running on http://localhost:${env.PORT}`);
});
import app from './app.js';
import { env } from './config/env.js';

import { logger } from '@h-relay/logger';

import { prisma } from './lib/prisma.js';
import { redis } from './lib/redis.js';
import './jobs/index.js';

const server = app.listen(env.PORT, () => {
  logger.info(
    {
      service: 'h-relay-api',
      env: env.NODE_ENV,
      port: env.PORT,
    },
    `🚀 H-Relay API running on http://localhost:${env.PORT}`,
  );
});

async function shutdown(signal: string) {
  logger.info({ signal }, 'Shutdown initiated');

  server.close(async () => {
    logger.info('HTTP server closed');

    try {
      await prisma.$disconnect();

      if (redis.status !== 'end') {
        await redis.quit();
      }

      logger.info('Resources disconnected');

      process.exit(0);
    } catch (err) {
      logger.error({ err }, 'Shutdown failed');

      process.exit(1);
    }
  });
}

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught Exception');
  void shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled Rejection');
  void shutdown('unhandledRejection');
});
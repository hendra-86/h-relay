import { Worker } from 'bullmq';

import { logger } from '@h-relay/logger';

import { bullConnection } from '../lib/bullmq.js';

export const worker = new Worker(
  'default',
  async (job) => {
    logger.info(
      {
        id: job.id,
        name: job.name,
        data: job.data,
      },
      'Processing job',
    );
  },
  {
    connection: bullConnection,
  },
);

worker.on('completed', (job) => {
  logger.info(
    {
      id: job.id,
      name: job.name,
    },
    'Job completed',
  );
});

worker.on('failed', (job, err) => {
  logger.error(
    {
      id: job?.id,
      error: err,
    },
    'Job failed',
  );
});
import { Worker } from 'bullmq';

import { logger } from '@h-relay/logger';

import { bullConnection } from '../../lib/bullmq.js';
import { whatsappProcessor } from '../processors/whatsapp.processor.js';

export const whatsappWorker = new Worker(
  'whatsapp',
  whatsappProcessor,
  {
    connection: bullConnection,
    concurrency: 5,
  },
);

whatsappWorker.on('completed', (job) => {
  logger.info(
    {
      id: job.id,
    },
    'WhatsApp worker completed',
  );
});

whatsappWorker.on('failed', (job, err) => {
  logger.error(
    {
      id: job?.id,
      err,
    },
    'WhatsApp worker failed',
  );
});
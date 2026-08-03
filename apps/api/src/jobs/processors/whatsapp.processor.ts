import { logger } from '@h-relay/logger';

import type { Job } from 'bullmq';

import type { WhatsappJob } from '../types/whatsapp-job.js';

export async function whatsappProcessor(
  job: Job<WhatsappJob>,
) {
  logger.info(
    {
      id: job.id,
      phone: job.data.phone,
      message: job.data.message,
    },
    'Processing WhatsApp job',
  );

  /**
   * Nanti di sini akan memanggil provider
   *
   * await whatsappProvider.send(...)
   */

  logger.info(
    {
      id: job.id,
    },
    'WhatsApp job completed',
  );
}
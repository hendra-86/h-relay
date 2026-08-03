import type { Job } from 'bullmq';

import { logger } from '@h-relay/logger';

import { whatsappService } from '../../modules/whatsapp/whatsapp.service.js';
import type { WhatsappJob } from '../types/whatsapp-job.js';

export async function whatsappProcessor(
  job: Job<WhatsappJob>,
) {
  logger.info(
    {
      id: job.id,
      phone: job.data.phone,
    },
    'Processing WhatsApp job',
  );

  await whatsappService.send(
    job.data.phone,
    job.data.message,
  );
}
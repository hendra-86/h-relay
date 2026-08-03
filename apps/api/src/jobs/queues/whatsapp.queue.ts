import { Queue } from 'bullmq';

import { bullConnection } from '../../lib/bullmq.js';
import type { WhatsappJob } from '../types/whatsapp-job.js';

export const whatsappQueue = new Queue<WhatsappJob>(
  'whatsapp',
  {
    connection: bullConnection,

    defaultJobOptions: {
      attempts: 3,

      removeOnComplete: 1000,

      removeOnFail: 1000,

      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    },
  },
);

export async function enqueueWhatsapp(
  data: WhatsappJob,
) {
  return whatsappQueue.add('send', data, {
    priority: data.priority ?? 1,
  });
}
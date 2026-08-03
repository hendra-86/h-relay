import { enqueueWhatsapp } from '../../jobs/queues/whatsapp.queue.js';

import type { WhatsappSendDto } from './whatsapp.schema.js';

export class WhatsappService {
  async send(data: WhatsappSendDto) {
    const job = await enqueueWhatsapp({
      phone: data.phone,
      message: data.message,
      priority: data.priority,
    });

    return {
      queued: true,
      jobId: job.id,
    };
  }
}

export const whatsappService =
  new WhatsappService();
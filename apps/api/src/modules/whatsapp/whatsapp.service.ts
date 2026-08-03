import { enqueueWhatsapp } from '../../jobs/queues/whatsapp.queue.js';
import { ProviderFactory } from './providers/index.js';

export class WhatsappService {
  async queue(
    phone: string,
    message: string,
  ) {
    const job = await enqueueWhatsapp({
      phone,
      message,
    });

    return {
      queued: true,
      jobId: job.id,
    };
  }

  async send(
    phone: string,
    message: string,
  ) {
    const provider = ProviderFactory.getProvider();

    await provider.sendMessage({
      phone,
      message,
    });
  }
}

export const whatsappService = new WhatsappService();
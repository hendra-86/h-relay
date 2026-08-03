import { logger } from '@h-relay/logger';

import { WhatsappClient } from '../client/whatsapp.client.js';
import type {
  SendMessagePayload,
  WhatsappProvider,
} from './whatsapp-provider.js';

export class WhatsappWebJsProvider
  implements WhatsappProvider
{
  async sendMessage(
    payload: SendMessagePayload,
  ): Promise<void> {
    const client = WhatsappClient.getInstance();

    const phone = payload.phone.replace(/\D/g, '');

    const chatId = `${phone}@c.us`;

    const exists = await client.isRegisteredUser(chatId);

    if (!exists) {
    throw new Error(`WhatsApp number ${phone} is not registered.`);
    }

    await client.sendMessage(chatId, payload.message);

    logger.info(
    {
        phone,
        chatId,
    },
    'WhatsApp message sent',
    );
  }
}
import { logger } from '@h-relay/logger';

import type {
  SendMessagePayload,
  WhatsappProvider,
} from './whatsapp-provider.js';

export class MockProvider
  implements WhatsappProvider
{
  async sendMessage(
    payload: SendMessagePayload,
  ): Promise<void> {
    logger.info(
      {
        phone: payload.phone,
        message: payload.message,
      },
      'Mock WhatsApp Provider',
    );
  }
}
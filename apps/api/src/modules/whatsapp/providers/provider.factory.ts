import type { WhatsappProvider } from './whatsapp-provider.js';

import { WhatsappWebJsProvider } from './whatsapp-webjs.provider.js';

export class ProviderFactory {
  private static provider: WhatsappProvider;

  static getProvider(): WhatsappProvider {
    if (!this.provider) {
      this.provider = new WhatsappWebJsProvider();
    }

    return this.provider;
  }
}
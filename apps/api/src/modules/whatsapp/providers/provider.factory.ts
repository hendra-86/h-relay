import type { WhatsappProvider } from './whatsapp-provider.js';

import { MockProvider } from './mock.provider.js';

export class ProviderFactory {
  private static provider: WhatsappProvider;

  static getProvider(): WhatsappProvider {
    if (!this.provider) {
      this.provider = new MockProvider();
    }

    return this.provider;
  }
}
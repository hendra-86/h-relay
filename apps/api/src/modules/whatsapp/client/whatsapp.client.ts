import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

import { logger } from '@h-relay/logger';

const { Client, LocalAuth } = pkg;

export class WhatsappClient {
  private static instance: InstanceType<typeof Client> | null = null;

  static getInstance(): InstanceType<typeof Client> {
    if (!this.instance) {
      this.instance = new Client({
        authStrategy: new LocalAuth({
          clientId: 'h-relay',
        }),

        puppeteer: {
            headless: true,
            executablePath:
                '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        },
      });

      this.registerEvents();
    }

    return this.instance;
  }

  private static registerEvents(): void {
    const client = this.instance!;

    client.on('qr', (qr: string) => {
      logger.info('WhatsApp QR received');

      qrcode.generate(qr, {
        small: true,
      });
    });

    client.on('authenticated', () => {
      logger.info('WhatsApp authenticated');
    });

    client.on('ready', () => {
      logger.info('WhatsApp ready');
    });

    client.on('auth_failure', (message: string) => {
      logger.error(
        { message },
        'WhatsApp authentication failed',
      );
    });

    client.on('disconnected', (reason: string) => {
      logger.warn(
        { reason },
        'WhatsApp disconnected',
      );
    });

    client.on('change_state', (state: string) => {
      logger.info(
        { state },
        'WhatsApp state changed',
      );
    });
  }

  static async initialize(): Promise<void> {
    const client = this.getInstance();

    await client.initialize();
  }

  static async destroy(): Promise<void> {
    if (!this.instance) {
      return;
    }

    await this.instance.destroy();

    this.instance = null;
  }
}
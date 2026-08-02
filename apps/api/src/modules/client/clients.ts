import type { Client } from './client.types.js';

export const clients: Client[] = [
  {
    id: 'default',
    name: 'Development Client',
    apiKey: process.env.API_KEY ?? 'hr_dev_change_me',
    active: true,
    rateLimit: 100,
    channels: [
      'whatsapp',
      'telegram',
      'email',
      'discord',
    ],
  },
];
import type { Client } from '../modules/client/client.types.js';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      client?: Client;
    }
  }
}

export {};
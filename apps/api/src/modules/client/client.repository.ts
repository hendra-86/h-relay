import { clients } from './clients.js';
import type { Client } from './client.types.js';

export class ClientRepository {
  findAll(): Client[] {
    return clients;
  }

  findById(id: string): Client | undefined {
    return clients.find((client) => client.id === id);
  }

  findByApiKey(apiKey: string): Client | undefined {
    return clients.find(
      (client) =>
        client.apiKey === apiKey &&
        client.active,
    );
  }
}

export const clientRepository = new ClientRepository();
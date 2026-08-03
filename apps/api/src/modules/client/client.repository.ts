import { prisma } from '../../lib/prisma.js';
import type { Client } from './client.types.js';

export class ClientRepository {
  async findAll(): Promise<Client[]> {
    return prisma.client.findMany();
  }

  async findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: {
        id,
      },
    });
  }

  async findByApiKey(apiKey: string): Promise<Client | null> {
    return prisma.client.findFirst({
      where: {
        apiKey,
        active: true,
      },
    });
  }
}

export const clientRepository = new ClientRepository();
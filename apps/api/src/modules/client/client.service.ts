import { clientRepository } from './client.repository.js';

export class ClientService {
  async findByApiKey(apiKey: string) {
    return await clientRepository.findByApiKey(apiKey);
  }

  async findAll() {
    return await clientRepository.findAll();
  }

  async findById(id: string) {
    return await clientRepository.findById(id);
  }
}

export const clientService = new ClientService();
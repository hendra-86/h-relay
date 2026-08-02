import { clientRepository } from './client.repository.js';

export class ClientService {
  findByApiKey(apiKey: string) {
    return clientRepository.findByApiKey(apiKey);
  }

  findAll() {
    return clientRepository.findAll();
  }

  findById(id: string) {
    return clientRepository.findById(id);
  }
}

export const clientService = new ClientService();
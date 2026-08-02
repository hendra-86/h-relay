import type { Client } from './client.types.js';

export function toClientResponse(client: Client) {
  return {
    id: client.id,
    name: client.name,
    active: client.active,
    rateLimit: client.rateLimit,
    channels: client.channels,
  };
}
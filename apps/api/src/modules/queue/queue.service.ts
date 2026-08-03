import { queue } from '../../jobs/queue.js';

export class QueueService {
  async enqueue() {
    return queue.add('hello', {
      phone: '628123456789',
      message: 'Hello BullMQ',
    });
  }
}

export const queueService = new QueueService();
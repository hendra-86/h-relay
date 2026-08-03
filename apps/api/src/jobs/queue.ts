import { Queue } from 'bullmq';

import { bullConnection } from '../lib/bullmq.js';

export const queue = new Queue('default', {
  connection: bullConnection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 100,
    attempts: 3,
  },
});
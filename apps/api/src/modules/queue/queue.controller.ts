import type { RequestHandler } from 'express';

import { success } from '../../shared/responses/index.js';
import { queueService } from './queue.service.js';

export class QueueController {
  test: RequestHandler = async (req, res) => {
    const job = await queueService.enqueue();

    return success(
      res,
      req.requestId,
      {
        queued: true,
        jobId: job.id,
      },
    );
  };
}

export const queueController = new QueueController();
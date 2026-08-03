import { Router } from 'express';

import { queueController } from './queue.controller.js';

const router = Router();

router.post(
  '/test',
  queueController.test,
);

export default router;
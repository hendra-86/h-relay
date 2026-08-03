import { Router } from 'express';

import { apiKeyMiddleware } from '../../middleware/api-key.middleware.js';
import { validate } from '../../middleware/validation.middleware.js';

import { whatsappController } from './whatsapp.controller.js';
import { WhatsappSendSchema } from './whatsapp.schema.js';

const router = Router();

router.post(
  '/send',
  apiKeyMiddleware,
  validate({
    body: WhatsappSendSchema,
  }),
  whatsappController.send,
);

export default router;
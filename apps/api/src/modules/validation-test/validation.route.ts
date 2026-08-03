import { Router } from 'express';

import { apiKeyMiddleware } from '../../middleware/api-key.middleware.js';
import { validate } from '../../middleware/validation.middleware.js';

import { validationController } from './validation.controller.js';
import { ValidationTestSchema } from './validation.schema.js';

const router = Router();

router.post(
  '/',
  apiKeyMiddleware,
  validate({
    body: ValidationTestSchema,
  }),
  validationController.send,
);

export default router;
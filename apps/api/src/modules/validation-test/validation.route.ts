import { Router } from 'express';

import { validate } from '../../middleware/validation.middleware.js';

import { validationController } from './validation.controller.js';
import { ValidationTestSchema } from './validation.schema.js';

const router = Router();

router.post(
  '/',
  validate({
    body: ValidationTestSchema,
  }),
  validationController.send,
);

export default router;
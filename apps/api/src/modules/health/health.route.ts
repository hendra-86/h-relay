// import { Router } from 'express';
import { AppError } from '../../errors/app-error.js';
import { ErrorCode } from '../../errors/index.js';
import { healthController } from './health.controller.js';
import { validate } from '../../middleware/validation.middleware.js';
import { ValidationTestSchema } from '../validation-test/validation.schema.js';
import { apiKeyMiddleware } from '../../middleware/api-key.middleware.js';


import {
  Router,
  type Router as ExpressRouter,
} from 'express';

const router: ExpressRouter = Router();

// const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is healthy
 */

router.get('/health', healthController.getHealth);

/**
 * @openapi
 * /ready:
 *   get:
 *     summary: Ready check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is ready
 */

router.get('/ready', healthController.getReady);

/**
 * @openapi
 * /live:
 *   get:
 *     summary: Live check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is live
 */

router.get('/live', healthController.getLive);

router.get('/error', (_req, _res) => {
  throw new AppError(
    'Testing error',
    400,
    ErrorCode.BAD_REQUEST,
  );
});

router.post(
  '/validation-test',
  apiKeyMiddleware,
  validate({
    body: ValidationTestSchema,
  }),
  healthController.validationTest,
);


export default router;
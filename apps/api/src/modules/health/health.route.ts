// import { Router } from 'express';
import { healthController } from './health.controller.js';

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



export default router;
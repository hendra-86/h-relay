// import { Router } from 'express';
import { healthController } from './health.controller.js';

import {
  Router,
  type Router as ExpressRouter,
} from 'express';

const router: ExpressRouter = Router();

// const router = Router();

router.get('/health', healthController.getHealth);

router.get('/ready', healthController.getReady);

router.get('/live', healthController.getLive);



export default router;
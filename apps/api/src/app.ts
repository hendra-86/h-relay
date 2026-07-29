import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import helmet from 'helmet';

import { logger } from '@h-relay/logger';

import { API_PREFIX } from './config/constants.js';
import { requestIdMiddleware } from './middleware/request-id.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFound } from './middleware/not-found.middleware.js';
import healthRouter from './modules/health/health.route.js';

dotenv.config();

const app: Express = express();

logger.info('API starting...');

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(requestIdMiddleware);

app.use(API_PREFIX, healthRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
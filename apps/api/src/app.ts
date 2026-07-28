import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import { Router, type Router as ExpressRouter } from 'express';
import helmet from 'helmet';

import { API_PREFIX } from './config/constants.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFound } from './middleware/not-found.middleware.js';
import healthRouter from './modules/health/health.route.js';

dotenv.config();

import express, { type Express } from 'express';

const app: Express = express();

const router: ExpressRouter = Router();

import { logger } from '@h-relay/logger';

logger.info('API starting...');

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(API_PREFIX, healthRouter);

// 404 Handler (harus setelah semua route)
app.use(notFound);

// Global Error Handler (paling bawah)
app.use(errorHandler);

export default app;
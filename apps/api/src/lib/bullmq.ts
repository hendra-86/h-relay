import { Redis } from 'ioredis';

import { logger } from '@h-relay/logger';

import { env } from '../config/env.js';

export const bullConnection = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD || undefined,
  db: env.REDIS_DB,

  lazyConnect: true,
  enableReadyCheck: true,

  // Required by BullMQ
  maxRetriesPerRequest: null,
});

bullConnection.on('connect', () => {
  logger.info('BullMQ Redis connected');
});

bullConnection.on('ready', () => {
  logger.info('BullMQ Redis ready');
});

bullConnection.on('error', (err: Error) => {
  logger.error(err, 'BullMQ Redis error');
});

bullConnection.on('close', () => {
  logger.warn('BullMQ Redis connection closed');
});

bullConnection.on('reconnecting', () => {
  logger.warn('BullMQ Redis reconnecting...');
});
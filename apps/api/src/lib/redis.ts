import { Redis } from 'ioredis';

import { logger } from '@h-relay/logger';

import { env } from '../config/env.js';


export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD || undefined,
  db: env.REDIS_DB,

  lazyConnect: true,
  enableReadyCheck: true,
  maxRetriesPerRequest: 3,
});

redis.on('connect', () => {
  logger.info('Redis connected');
});

redis.on('ready', () => {
  logger.info('Redis ready');
});

redis.on('close', () => {
  logger.warn('Redis connection closed');
});

redis.on('reconnecting', () => {
  logger.warn('Redis reconnecting...');
});

redis.on('error', (err: unknown) => {
  logger.error({ err }, 'Redis error');
});

export async function ensureRedisConnection() {
  if (redis.status === 'wait') {
    await redis.connect();
  }

  return redis;
}
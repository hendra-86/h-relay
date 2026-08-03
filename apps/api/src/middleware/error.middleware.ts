import type { ErrorRequestHandler } from 'express';

import { logger } from '@h-relay/logger';

import { AppError } from '../errors/app-error.js';
import { ErrorCode } from '../errors/error-code.js';
import { error } from '../shared/responses/error.js';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
) => {
  logger.error(
    {
        err,
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl,
    },
    err.message,
    );

  if (err instanceof ZodError) {
    return res.status(400).json({
        success: false,
        requestId: req.requestId,
        error: {
        code: ErrorCode.VALIDATION_ERROR,
        message: 'Validation failed',
        },
        details: err.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
        })),
        timestamp: new Date().toISOString(),
    });
    }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
        success: false,
        requestId: req.requestId,
        error: {
        code: err.code,
        message: err.message,
        },
        details: err.details,
        timestamp: new Date().toISOString(),
    });
    }

  return error(
    res,
    500,
    req.requestId,
    ErrorCode.INTERNAL_SERVER_ERROR,
    process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message,
    );
};
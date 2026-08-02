import type { RequestHandler } from 'express';

import { AppError } from '../errors/app-error.js';
import { ErrorCode } from '../errors/error-code.js';
import { authConfig } from '../config/auth.config.js';

export const apiKeyMiddleware: RequestHandler = (
  req,
  _res,
  next,
) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return next(
      new AppError(
        'API key is required',
        401,
        ErrorCode.UNAUTHORIZED,
      ),
    );
  }

  if (apiKey !== authConfig.apiKey) {
    return next(
      new AppError(
        'Invalid API key',
        401,
        ErrorCode.UNAUTHORIZED,
      ),
    );
  }

  next();
};
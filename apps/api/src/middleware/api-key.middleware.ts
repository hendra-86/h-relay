import type { RequestHandler } from 'express';

import { AppError } from '../errors/app-error.js';
import { ErrorCode } from '../errors/error-code.js';
import { clientService } from '../modules/client/client.service.js';

export const apiKeyMiddleware: RequestHandler = async (
  req,
  _res,
  next,
) => {
  try {
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

    const client = await clientService.findByApiKey(apiKey);

    if (!client) {
      return next(
        new AppError(
          'Invalid API key',
          401,
          ErrorCode.UNAUTHORIZED,
        ),
      );
    }

    req.client = client;

    next();
  } catch (err) {
    next(err);
  }
};
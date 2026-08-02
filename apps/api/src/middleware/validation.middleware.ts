import type { RequestHandler } from 'express';
import { ZodError, type ZodSchema } from 'zod';

import { AppError } from '../errors/app-error.js';
import { ErrorCode } from '../errors/error-code.js';

type ValidationSchemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export function validate(
  schemas: ValidationSchemas,
): RequestHandler {
  return async (req, _res, next) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params)) as typeof req.params;
      }

      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query)) as typeof req.query;
      }

      next();
    } catch (err) {
        if (err instanceof ZodError) {
            return next(
                new AppError(
                    'Validation failed',
                    400,
                    ErrorCode.VALIDATION_ERROR,
                    err.issues.map((issue) => ({
                        path: issue.path.join('.'),
                        message: issue.message,
                    })),
                    ),
            );
        }

        next(err);
    }
  };
}
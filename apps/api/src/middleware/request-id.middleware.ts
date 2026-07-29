import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId =
    req.header('x-request-id') ??
    req.header('X-Request-ID') ??
    randomUUID();

  req.requestId = requestId;

  res.setHeader('X-Request-ID', requestId);

  next();
}
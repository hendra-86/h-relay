import { Response } from 'express';

export function success<T>(
  res: Response,
  data: T,
  status = 200,
) {
  return res.status(status).json({
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
}
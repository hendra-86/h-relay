import { Response } from 'express';

export function failure(
  res: Response,
  code: string,
  message: string,
  status = 500,
) {
  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
}
import type { Response } from 'express';

export function error(
  res: Response,
  status: number,
  requestId: string | undefined,
  code: string,
  message: string,
) {
  return res.status(status).json({
    success: false,
    requestId,
    error: {
      code,
      message,
    },
    timestamp: new Date().toISOString(),
  });
}
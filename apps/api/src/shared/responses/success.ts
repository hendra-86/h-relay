import type { Response } from 'express';

type SuccessOptions = {
  status?: number;
  meta?: Record<string, unknown>;
};

export function success<T>(
  res: Response,
  requestId: string,
  data: T,
  options: SuccessOptions = {},
) {
  const { status = 200, meta = {} } = options;

  return res.status(status).json({
    success: true,
    requestId,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  });
}
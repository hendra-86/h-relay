import { ErrorCode } from './error-code.js';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: ErrorCode,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = 'AppError';

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, AppError);
  }
}
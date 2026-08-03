import type { RequestHandler } from 'express';
import { success } from '../../shared/responses/index.js';

export class ValidationController {
  send: RequestHandler = (req, res) => {
    return success(
      res,
      req.requestId,
      {
        client: req.client?.name,
        phone: req.body.phone,
        message: req.body.message,
      },
    );
  };
}

export const validationController =
  new ValidationController();
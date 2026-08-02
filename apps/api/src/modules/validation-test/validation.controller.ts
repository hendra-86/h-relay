import { RequestHandler } from 'express';

export class ValidationController {
  send: RequestHandler = (req, res) => {
    res.json({
      success: true,
      requestId: req.requestId,
      data: req.body,
    });
  };
}

export const validationController =
  new ValidationController();
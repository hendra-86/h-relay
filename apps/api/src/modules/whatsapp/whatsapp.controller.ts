import type { RequestHandler } from 'express';

import { success } from '../../shared/responses/success.js';

import { whatsappService } from './whatsapp.service.js';

export class WhatsappController {
  send: RequestHandler = async (
    req,
    res,
  ) => {
    const result =
      await whatsappService.queue(
        req.body.phone,
        req.body.message,
      );

    return success(
      res,
      req.requestId,
      result,
    );
  };
}

export const whatsappController =
  new WhatsappController();
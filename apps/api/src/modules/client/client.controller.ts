import type { RequestHandler } from 'express';

import { clientService } from './client.service.js';
import { success } from '../../shared/responses/success.js';
import { AppError } from '../../errors/app-error.js';
import { ErrorCode } from '../../errors/error-code.js';
import { toClientResponse } from './client.mapper.js';

export class ClientController {
  getAll: RequestHandler = (req, res) => {
    return success(
      res,
      req.requestId,
      clientService.findAll().map(toClientResponse)
    );
  };

  getById: RequestHandler = (req, res, next) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
    return next(
        new AppError(
        'Invalid client id',
        400,
        ErrorCode.BAD_REQUEST,
        ),
    );
    }

    const client = clientService.findById(id);

    if (!client) {
      return next(
        new AppError(
          'Client not found',
          404,
          ErrorCode.NOT_FOUND,
        ),
      );
    }

    return success(
      res,
      req.requestId,
      toClientResponse(client),
    );
  };
}

export const clientController = new ClientController();
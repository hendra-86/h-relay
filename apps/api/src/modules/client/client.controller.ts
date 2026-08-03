import type { RequestHandler } from 'express';

import { clientService } from './client.service.js';
import { toClientResponse } from './client.mapper.js';
import { success } from '../../shared/responses/success.js';
import { AppError } from '../../errors/app-error.js';
import { ErrorCode } from '../../errors/error-code.js';

export class ClientController {
  getAll: RequestHandler = async (req, res) => {
    const clients = await clientService.findAll();

    return success(
      res,
      req.requestId,
      clients.map(toClientResponse),
    );
  };

  getById: RequestHandler = async (req, res, next) => {
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

    const client = await clientService.findById(id);

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
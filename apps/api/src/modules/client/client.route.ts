import { Router } from 'express';

import { clientController } from './client.controller.js';
import { validate } from '../../middleware/validation.middleware.js';
import { ClientIdSchema } from './client.schema.js';

const router = Router();

/**
 * @openapi
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get(
  '/',
  clientController.getAll,
);

/**
 * @openapi
 * /clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client details
 *       404:
 *         description: Client not found
 */
router.get(
  '/:id',
  validate({
    params: ClientIdSchema,
  }),
  clientController.getById,
);

export default router;
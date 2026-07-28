import { RequestHandler } from 'express';
import { healthService } from './health.service.js';
import { success } from '../../shared/responses/success.js';


export class HealthController {
    getHealth: RequestHandler = (_req, res) => {
        return success(res, healthService.health());
    };

    getReady: RequestHandler = (_req, res) => {
        return success(res, healthService.ready());
    };

    getLive: RequestHandler = (_req, res) => {
        return success(res, healthService.live());
    };
}

export const healthController = new HealthController();
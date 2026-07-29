import { RequestHandler } from 'express';
import { healthService } from './health.service.js';
import { success } from '../../shared/responses/success.js';


export class HealthController {
    getHealth: RequestHandler = (req, res) => {
        res.json({
            requestId: req.requestId,
            ...healthService.health(),
        });
    };

    getReady: RequestHandler = (req, res) => {
        res.json({
            requestId: req.requestId,
            ...healthService.ready(),
        });
        // return success(res, healthService.ready());
    };

    getLive: RequestHandler = (req, res) => {
        // return success(res, healthService.live());
        res.json({
            requestId: req.requestId,
            ...healthService.live(),
        });
    };
}

export const healthController = new HealthController();
import { RequestHandler } from 'express';
import { healthService } from './health.service.js';
import { success } from '../../shared/responses/success.js';


export class HealthController {
    getHealth: RequestHandler = (req, res) => {
        return success(
            res,
            req.requestId,
            healthService.health(),
        );
    };

    getReady: RequestHandler = async (req, res) => {
        const result = await healthService.ready();

            return success(
                res,
                req.requestId,
                result,
            );
    };

    getLive: RequestHandler = (req, res) => {
        // return success(res, healthService.live());
        return success(
            res,
            req.requestId,
            healthService.live(),
        );
    };

    validationTest: RequestHandler = (req, res) => {
        return success(
            res,
            req.requestId,
            {
                phone: req.body.phone,
                message: req.body.message,
            },
        );
    };
}

export const healthController = new HealthController();
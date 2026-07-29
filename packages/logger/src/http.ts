import { pinoHttp } from 'pino-http';
import { logger } from './logger.js';

export const httpLogger = pinoHttp({
  logger,

  customProps(req) {
    return {
      requestId: (req as typeof req & { requestId?: string }).requestId,
    };
  },

//   serializers: {
//     req(req) {
//       return {
//         method: req.method,
//         url: req.url,
//         remoteAddress: req.socket.remoteAddress,
//         userAgent: req.headers['user-agent'],
//       };
//     },
//   },

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },

  customErrorMessage(req, res) {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },
});
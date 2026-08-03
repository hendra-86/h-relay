import { prisma } from '../../lib/prisma.js';
import { SERVICE_NAME, VERSION } from '../../config/constants.js';

type HealthResponse = {
  status: string;
  service: string;
  version: string;
};

type ReadyResponse = {
  status: string;
  checks: {
    database: string;
    redis: string;
    worker: string;
  };
};

type LiveResponse = {
  status: string;
};

export class HealthService {
  health(): HealthResponse {
    return {
      status: 'ok',
      service: SERVICE_NAME,
      version: VERSION,
    };
  }

  async ready(): Promise<ReadyResponse> {
    try {
      await prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ready',
        checks: {
          database: 'ok',
          redis: 'not_configured',
          worker: 'not_configured',
        },
      };
    } catch {
      return {
        status: 'not_ready',
        checks: {
          database: 'error',
          redis: 'not_configured',
          worker: 'not_configured',
        },
      };
    }
  }

  live(): LiveResponse {
    return {
      status: 'alive',
    };
  }
}

export const healthService = new HealthService();
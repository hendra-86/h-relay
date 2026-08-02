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
  /**
   * Health endpoint
   * Digunakan untuk informasi dasar aplikasi
   */
  health(): HealthResponse {
    return {
      status: 'ok',
      service: SERVICE_NAME,
      version: VERSION,
    };
  }

  /**
   * Readiness endpoint
   * Nantinya akan mengecek Redis, PostgreSQL,
   * Queue, WhatsApp Session, dsb.
   */
  ready(): ReadyResponse {
    return {
      status: 'ready',
      checks: {
        database: 'not_configured',
        redis: 'not_configured',
        worker: 'not_configured',
      },
    };
  }

  /**
   * Liveness endpoint
   * Digunakan Kubernetes untuk memastikan
   * proses Node.js masih hidup.
   */
  live(): LiveResponse {
    return {
      status: 'alive',
    };
  }
}

export const healthService = new HealthService();
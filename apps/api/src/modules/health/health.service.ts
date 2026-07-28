import { SERVICE_NAME, VERSION } from '../../config/constants.js';

type HealthResponse = {
  status: string;
  service: string;
  version: string;
  timestamp: string;
};

type ReadyResponse = {
  status: string;
  timestamp: string;
  checks: {
    database: string;
    redis: string;
    worker: string;
  };
};

type LiveResponse = {
  status: string;
  timestamp: string;
};

export class HealthService {
  /**
   * Generate current timestamp
   */
  private now(): string {
    return new Date().toISOString();
  }

  /**
   * Health endpoint
   * Digunakan untuk informasi dasar aplikasi
   */
  health(): HealthResponse {
    return {
      status: 'ok',
      service: SERVICE_NAME,
      version: VERSION,
      timestamp: this.now(),
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
      timestamp: this.now(),
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
      timestamp: this.now(),
    };
  }
}

export const healthService = new HealthService();
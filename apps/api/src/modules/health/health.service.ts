import { SERVICE_NAME, VERSION } from '../../config/constants.js';
import { prisma } from '../../lib/prisma.js';
import { ensureRedisConnection } from '../../lib/redis.js';

type HealthResponse = {
  status: string;
  service: string;
  version: string;
};

type CheckStatus = 'ok' | 'error' | 'not_configured';

type ReadyResponse = {
  status: 'ready' | 'not_ready';
  checks: {
    database: CheckStatus;
    redis: CheckStatus;
    worker: CheckStatus;
  };
};

type LiveResponse = {
  status: string;
};

export class HealthService {
  /**
   * Health endpoint
   * Informasi dasar aplikasi.
   */
  health(): HealthResponse {
    return {
      status: 'ok',
      service: SERVICE_NAME,
      version: VERSION,
    };
  }

  /**
   * Mengecek koneksi database.
   */
  private async checkDatabase(): Promise<CheckStatus> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return 'ok';
    } catch {
      return 'error';
    }
  }

  /**
   * Mengecek koneksi Redis.
   */
  private async checkRedis(): Promise<CheckStatus> {
    try {
      const redis = await ensureRedisConnection();

      await redis.ping();

      return 'ok';
    } catch {
      return 'error';
    }
  }

  /**
   * Readiness endpoint.
   * Digunakan Kubernetes untuk memastikan dependency siap digunakan.
   */
  async ready(): Promise<ReadyResponse> {
    const checks = {
      database: await this.checkDatabase(),
      redis: await this.checkRedis(),
      worker: 'not_configured' as const,
    };

    const status: ReadyResponse['status'] =
      checks.database === 'ok' && checks.redis === 'ok'
        ? 'ready'
        : 'not_ready';

    return {
      status,
      checks,
    };
  }

  /**
   * Liveness endpoint.
   * Digunakan Kubernetes untuk memastikan proses Node.js masih hidup.
   */
  live(): LiveResponse {
    return {
      status: 'alive',
    };
  }
}

export const healthService = new HealthService();
import type { HealthCheckStatus } from '../../shared/constants.ts';

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

export interface ReadyResponse {
  status: string;
  timestamp: string;
  checks: {
    database: HealthCheckStatus;
    redis: HealthCheckStatus;
    worker: HealthCheckStatus;
  };
}

export interface LiveResponse {
  status: string;
  timestamp: string;
}
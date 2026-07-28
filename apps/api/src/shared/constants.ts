export const HealthCheckStatus = {
  UP: 'up',
  DOWN: 'down',
  NOT_CONFIGURED: 'not_configured',
} as const;

export type HealthCheckStatus =
  (typeof HealthCheckStatus)[keyof typeof HealthCheckStatus];
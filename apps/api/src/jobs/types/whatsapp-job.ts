export type WhatsappJob = {
  phone: string;
  message: string;
  priority?: number;
  metadata?: Record<string, unknown>;
};
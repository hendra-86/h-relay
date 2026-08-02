export type Client = {
  id: string;
  name: string;
  apiKey: string;
  active: boolean;
  rateLimit: number;
  channels: string[];
};
export interface SendMessagePayload {
  phone: string;
  message: string;
}

export interface WhatsappProvider {
  sendMessage(
    payload: SendMessagePayload,
  ): Promise<void>;
}
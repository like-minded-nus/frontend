export interface Message {
  messageId: number;
  senderProfileId: number;
  receiverProfileId: number;
  text: String;
  sentDatetime: String;
  isRead: boolean;
}

export interface Payload {
  body: string;
}

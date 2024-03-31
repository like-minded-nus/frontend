export interface Message {
  messageId: number;
  senderProfileId: number;
  receiverProfileId: number;
  text: String;
  sentDateTime: Date;
  isRead: String;
}

export interface Payload {
  body: string;
}

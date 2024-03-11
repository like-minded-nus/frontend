// export interface Message {
//     messageId: number;
//     senderProfileId: number;
//     receiverProfileId: number;
//     text: boolean;
//     sentDatetime: String;
//     isRead: boolean;
// }

export interface Message {
  text: string;
  profileId: number;
}

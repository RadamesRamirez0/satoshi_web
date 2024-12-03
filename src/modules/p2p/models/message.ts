export interface Message {
  id: string;
  sender_id: string;
  message: string;
  attachment: boolean;
  timestamp: string;
  read: number;
}

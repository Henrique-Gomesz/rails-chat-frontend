import { Message } from "./message";

export type Conversation = {
  id: number;
  conversationId: string;
  name: string;
  messages: Message[];
  participants: string[];
  createdAt: Date;
};

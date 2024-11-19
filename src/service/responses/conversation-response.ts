export type ConversationResponse = {
  id: number;
  conversation_uuid: string;
  name: string;
  conversation_participants: [{ user: { username: string } }];
  messages: [
    { message: string; created_at: string; user: { username: string } },
  ];
  created_at: string;
  updated_at: string;
};

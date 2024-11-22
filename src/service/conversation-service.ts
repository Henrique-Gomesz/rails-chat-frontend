import { HTTP_URL } from "../constants";
import { Conversation } from "../types/conversation";
import { ConversationResponse } from "./responses/conversation-response";
import { NewMessageResponse } from "./responses/new-message-response";

export async function getAllUsernames(): Promise<string[]> {
  const response = await fetch(`${HTTP_URL}/user/list`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch usernames");
  }

  const data = await response.json();

  return data.usernames;
}

export async function createConversation(
  usernames: string[],
  conversationName: string,
): Promise<Conversation> {
  const response = await fetch(`${HTTP_URL}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      participants: usernames,
      conversation_name: conversationName,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create conversation");
  }

  const data = await response.json() as ConversationResponse;

  return {
    id: data.id,
    name: data.name,
    conversationId: data.conversation_uuid,
    participants: data.conversation_participants.map((p) => p.user.username),
    messages: [],
    createdAt: new Date(data.created_at),
  };
}

export async function getConversations(): Promise<Conversation[]> {
  const response = await fetch(`${HTTP_URL}/conversations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }

  const data = await response.json() as ConversationResponse[];

  return data.map((conversation) => {
    return {
      id: conversation.id,
      name: conversation.name,
      conversationId: conversation.conversation_uuid,
      participants: conversation.conversation_participants.map((p) =>
        p.user.username
      ),
      messages: conversation.messages.map((message) => {
        return {
          author: message.user.username,
          createdAt: new Date(message.created_at),
          message: message.message,
        };
      }),
      createdAt: new Date(conversation.created_at),
    } as Conversation;
  });
}

export async function sendMessage(
  message: string,
  conversationId: string,
): Promise<NewMessageResponse> {
  const response = await fetch(
    `${HTTP_URL}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message: message,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data = await response.json() as NewMessageResponse;

  return data;
}

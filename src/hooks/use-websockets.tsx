import ActionCable from "actioncable";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ConversationResponse } from "../service/responses/conversation-response";
import { NewMessageResponse } from "../service/responses/new-message-response";
import { conversationsAtom } from "../store/store";
import { Conversation } from "../types/conversation";
import { WS_URL } from "../constants";

type NewConversationPayload = {
  action: "new_conversation";
  body: ConversationResponse;
};

type NewMessagePayload = {
  action: "new_message";
  body: NewMessageResponse;
};

export const useWebsockets = () => {
  const [conversations, setConversations] = useAtom(conversationsAtom);
  const [channel, setChannel] = useState<
    ActionCable.Channel & ActionCable.CreateMixin | undefined
  >(undefined);
  const handleNewMessage = useCallback((data: NewMessagePayload) => {
    const targetConversation = conversations.find((chat) =>
      chat.conversationId === data.body.conversation_uuid
    );

    if (!targetConversation) {
      return;
    }

    setConversations((oldConversations) => {
      return oldConversations.map((chat) => {
        if (chat.conversationId === data.body.conversation_uuid) {
          chat.messages.push({
            author: data.body.author || "",
            createdAt: new Date(data.body.created_at),
            message: data.body.message,
          });
        }

        return chat;
      });
    });

    toast(
      `Você recebeu uma nova mensagem de ${data.body.author} na conversa "${targetConversation?.name}"`,
    );
  }, [conversations]);

  const handleNewChat = useCallback((data: NewConversationPayload) => {
    const newConversation = {
      id: data.body.id,
      name: data.body.name,
      conversationId: data.body.conversation_uuid,
      participants: data.body.conversation_participants.map((p) =>
        p.user.username
      ),
      messages: [],
      createdAt: new Date(data.body.created_at),
    };
    onNewConversation(newConversation);
    toast(`Você foi adicionado a conversa "${newConversation.name}"`);
  }, [conversations]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const websocket = ActionCable.createConsumer(
      `${WS_URL}?token=${token}`,
    );

    const channel = websocket.subscriptions.create({
      channel: "ActivitiesChannel",
    });

    setChannel(channel);
  }, []);

  useEffect(() => {
    if (channel) {
      channel.connected = () => console.log("connected");
      channel.received = receiveMessage;
    }
  }, [conversations]);

  function receiveMessage(
    data: NewConversationPayload | NewMessagePayload,
  ) {
    if (data.action === "new_conversation") {
      handleNewChat(data);
    }

    if (data.action === "new_message") {
      handleNewMessage(data);
    }
  }

  function onNewConversation(conversation: Conversation) {
    setConversations((oldConversations) => [...oldConversations, conversation]);
  }
};

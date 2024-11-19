import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  createConversation,
  getAllUsernames,
  getConversations,
  sendMessage,
} from "../../service/conversation-service";
import { Conversation } from "../../types/conversation";
import {
  AddChatButton,
  AuthorMessage,
  Button,
  ChatHeader,
  ChatItem,
  ChatList,
  ChatSection,
  Checkbox,
  Container,
  Input,
  Message,
  MessageContainer,
  MessageDate,
  MessageInput,
  Messages,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NoChatSelected,
  Sidebar,
  UserItem,
  UserList,
} from "./messages.styles";
import { DateFormat } from "../../constants";

export const MessagesPage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newChatName, setNewChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [message, setMessage] = useState<string>("");

  const chatListRef = useRef<HTMLDivElement>(null);

  const selectedChat = useMemo(() => {
    return conversations.find((chat) => chat.conversationId === selectedChatId);
  }, [conversations, selectedChatId]);

  useEffect(() => {
    getConversations().then((data) => setConversations(data));
    getAllUsernames().then((data) => setUsernames(data));
  }, []);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        behavior: "smooth",
        top: chatListRef.current.scrollHeight,
      });
    }
  }, [conversations]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [selectedChatId]);

  const handleUserSelection = (user: string) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const handleCreateChat = () => {
    if (newChatName.trim() && selectedUsers.length) {
      createConversation(selectedUsers, newChatName).then((newConversation) => {
        const newConversations = [...conversations, newConversation];
        setConversations(newConversations);
        setShowModal(false);
        setSelectedUsers([]);
        setNewChatName("");
      });
    }
  };

  function handleChangeChat(chat: Conversation) {
    setSelectedChatId(chat.conversationId);
    setMessage("");
  }

  function onSendMessage() {
    if (selectedChat) {
      sendMessage(message, selectedChat?.conversationId).then((newMessage) => {
        const updatedConversation = conversations.map((chat) => {
          if (chat.conversationId === selectedChat.conversationId) {
            chat.messages.push({
              author: "as",
              createdAt: new Date(newMessage.created_at),
              message: newMessage.message,
            });
          }

          return chat;
        });
        setConversations([...updatedConversation]);
        setMessage("");
      });
    }
  }

  function onMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  return (
    <Container>
      <Sidebar>
        <ChatList>
          {conversations.map((chat) => (
            <ChatItem
              key={chat.id}
              onClick={() => handleChangeChat(chat)}
            >
              {chat.name}
            </ChatItem>
          ))}
        </ChatList>
        <AddChatButton onClick={() => setShowModal(true)}>
          +
        </AddChatButton>
      </Sidebar>
      <ChatSection>
        {selectedChat
          ? (
            <>
              <ChatHeader>{selectedChat.name}</ChatHeader>
              <Messages ref={chatListRef}>
                {selectedChat.messages.map((message, index) => (
                  <MessageContainer>
                    <AuthorMessage>{message.author}</AuthorMessage>
                    <Message key={index}>
                      {message.message}
                      <MessageDate>
                        {DateFormat.format(message.createdAt)}
                      </MessageDate>
                    </Message>
                  </MessageContainer>
                ))}
              </Messages>

              <MessageInput
                onChange={onMessageChange}
                value={message}
                placeholder="Digite uma mensagem..."
              />
              <Button onClick={onSendMessage}>&gt;</Button>
            </>
          )
          : <NoChatSelected>Selecione uma conversa</NoChatSelected>}
      </ChatSection>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>Criar Nova Conversa</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                placeholder="Nome da conversa"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
              />
              <UserList>
                {usernames.map((user) => (
                  <UserItem key={user}>
                    <Checkbox
                      type="checkbox"
                      checked={selectedUsers.includes(user)}
                      onChange={() => handleUserSelection(user)}
                    />
                    {user}
                  </UserItem>
                ))}
              </UserList>
              <ModalFooter>
                <Button onClick={handleCreateChat}>Criar Conversa</Button>
                <Button onClick={() => setShowModal(false)}>Fechar</Button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

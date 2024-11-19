import React, { useEffect, useState } from "react";
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

export const MessagesPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newChatName, setNewChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getConversations().then((data) => setConversations(data));
    getAllUsernames().then((data) => setUsernames(data));
  }, []);

  const handleUserSelection = (user: string) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const handleCreateChat = () => {
    if (newChatName.trim() && selectedUsers.length) {
      createConversation(selectedUsers, newChatName).then((newConversation) => {
        setConversations((prev) => [...prev, newConversation]);
        setShowModal(false);
        setSelectedUsers([]);
        setNewChatName("");
      });
    }
  };

  function handleChangeChat(chat: Conversation) {
    setSelectedChat(chat);
    setMessage("");
  }

  function onSendMessage() {
    if (selectedChat) {
      sendMessage(message, selectedChat?.conversationId).then(() => {
        getConversations().then((data) => setConversations(data));
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
              <Messages>
                {selectedChat.messages.map((message, index) => (
                  <MessageContainer>
                    <AuthorMessage>{message.author}</AuthorMessage>
                    <Message key={index}>{message.message}</Message>
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

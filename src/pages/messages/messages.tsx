import React, { useEffect, useMemo, useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FormatDate } from "../../constants";
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
  ChatDate,
  ChatHeader,
  ChatItem,
  ChatList,
  ChatSection,
  Checkbox,
  Container,
  ConversationButtonsContainer,
  Input,
  Message,
  MessageContainer,
  MessageDate,
  MessageInput,
  MessageInputContainer,
  Messages,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NoChatSelected,
  Participants,
  ParticipantsContainer,
  Sidebar,
  UserItem,
  UserList,
} from "./messages.styles";
import ChatSkeleton from "../../components/skeletons/skeleton-chat";

const username = localStorage.getItem("username");

export const MessagesPage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newChatName, setNewChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [message, setMessage] = useState<string>("");
  const [lockSendMessage, setLockSendMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const chatListRef = useRef<HTMLDivElement>(null);

  const selectedChat = useMemo(() => {
    return conversations.find((chat) => chat.conversationId === selectedChatId);
  }, [conversations, selectedChatId]);

  useEffect(() => {
    getConversations().then((data) => setConversations(data)).finally(() => {
      setIsLoading(false);
    });
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

  function onSendMessage(e: React.FormEvent) {
    setLockSendMessage(true);
    e.preventDefault();
    if (selectedChat) {
      sendMessage(message, selectedChat?.conversationId).then((newMessage) => {
        const updatedConversation = conversations.map((chat) => {
          if (chat.conversationId === selectedChat.conversationId) {
            chat.messages.push({
              author: localStorage.getItem("username") || "Eu",
              createdAt: new Date(newMessage.created_at),
              message: newMessage.message,
            });
          }

          return chat;
        });
        setConversations([...updatedConversation]);
        setMessage("");
      }).finally(() => {
        setLockSendMessage(false);
      });
    }
  }

  function onMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  }

  function renderChatList() {
    return (
      <Sidebar>
        <ChatList>
          {isLoading ? <ChatSkeleton /> : conversations.map((chat) => (
            <ChatItem
              key={chat.id}
              onClick={() => handleChangeChat(chat)}
            >
              {chat.name}
              <ChatDate>Criado em</ChatDate>
              <ChatDate>{FormatDate(chat.createdAt, false)}</ChatDate>
            </ChatItem>
          ))}
        </ChatList>
        <ConversationButtonsContainer>
          <CiLogout
            onClick={logout}
            cursor={"pointer"}
            size={28}
            color="#54141c"
          />

          <AddChatButton onClick={() => setShowModal(true)}>
            +
          </AddChatButton>
        </ConversationButtonsContainer>
      </Sidebar>
    );
  }

  function renderChatSection() {
    return (
      <ChatSection>
        {selectedChat
          ? (
            <>
              <ChatHeader>{selectedChat.name}</ChatHeader>

              <Participants>
                Participantes: {selectedChat.participants.join(", ")}
              </Participants>

              <Messages ref={chatListRef}>
                {selectedChat.messages.map((message, index) => (
                  <MessageContainer>
                    {message.author !== username && (
                      <AuthorMessage>{message.author}</AuthorMessage>
                    )}
                    <Message
                      isUserMessage={message.author === username}
                      key={index}
                    >
                      {message.message}
                      <MessageDate>
                        {FormatDate(message.createdAt)}
                      </MessageDate>
                    </Message>
                  </MessageContainer>
                ))}
              </Messages>

              <MessageInputContainer>
                <MessageInput
                  onChange={onMessageChange}
                  value={message}
                  placeholder="Digite uma mensagem..."
                />
                <Button
                  disabled={lockSendMessage}
                  type="submit"
                  onClick={onSendMessage}
                >
                  &gt;
                </Button>
              </MessageInputContainer>
            </>
          )
          : <NoChatSelected>Selecione uma conversa</NoChatSelected>}
      </ChatSection>
    );
  }

  function renderModal() {
    if (showModal) {
      return (
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
                {[
                  usernames.map((user) => (
                    <UserItem key={user}>
                      <Checkbox
                        type="checkbox"
                        checked={selectedUsers.includes(user)}
                        onChange={() => handleUserSelection(user)}
                      />
                      {user}
                    </UserItem>
                  )),
                ]}
              </UserList>
              <ModalFooter>
                <Button onClick={handleCreateChat}>Criar Conversa</Button>
                <Button onClick={() => setShowModal(false)}>Fechar</Button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </ModalOverlay>
      );
    }
  }

  return (
    <Container>
      {renderChatList()}
      {renderChatSection()}
      {renderModal()}
    </Container>
  );
};

import React from "react";
import { CiLogout } from "react-icons/ci";
import { MainScreen } from "../../components/main-screen/main-screen";
import ChatSkeleton from "../../components/skeletons/skeleton-chat";
import { FormatDate } from "../../constants";
import { useWebsockets } from "../../hooks/use-websockets";
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
  Sidebar,
  UserItem,
  UserList,
} from "./messages.styles";
import { useMessagesHook } from "./use-messages-hook";

const username = localStorage.getItem("username");

export const MessagesPage: React.FC = () => {
  useWebsockets();
  const {
    chatListRef,
    conversations,
    handleChangeChat,
    handleCreateChat,
    handleUserSelection,
    isLoading,
    lockSendMessage,
    logout,
    message,
    newChatName,
    onChangeChatName,
    onMessageChange,
    handleModal,
    onSendMessage,
    selectedChat,
    selectedUsers,
    showModal,
    usernames,
  } = useMessagesHook();

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

          <AddChatButton onClick={handleModal}>
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
                  <MessageContainer key={`${message.author}-index`}>
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
                onChange={onChangeChatName}
              />
              <UserList>
                {[
                  usernames.map((user, index) => (
                    <UserItem key={`${user}-${index}`}>
                      <Checkbox
                        type="checkbox"
                        checked={selectedUsers.includes(user)}
                        onChange={() =>
                          handleUserSelection(user)}
                      />
                      {user}
                    </UserItem>
                  )),
                ]}
              </UserList>
              <ModalFooter>
                <Button onClick={handleCreateChat}>Criar Conversa</Button>
                <Button onClick={handleModal}>Fechar</Button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </ModalOverlay>
      );
    }
  }

  return (
    <MainScreen>
      <Container>
        {renderChatList()}
        {renderChatSection()}
        {renderModal()}
      </Container>
    </MainScreen>
  );
};

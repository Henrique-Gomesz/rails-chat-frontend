import React, { useEffect, useState } from "react";
import { MainScreen } from "../../components/main-screen/main-screen";
import { useWebsockets } from "../../hooks/use-websockets";
import { ChatSection } from "./components/chat-section/chat-section";
import { ConversationList } from "./components/conversations-list/conversation-list";
import { NewConversationModal } from "./components/new-conversation-modal/new-conversation-modal";
import { Container } from "./messages.styles";
import { useMessagesHook } from "./use-messages-hook";

const MAX_WIDTH = 725;

export const MessagesPage: React.FC = () => {
  useWebsockets();
  const {
    username,
    handleChangeChat,
    handleCreateChat,
    handleUserSelection,
    onChangeChatName,
    onMessageChange,
    handleModal,
    onSendMessage,
    logout,
    onGoBack,
    chatListRef,
    isLoading,
    lockSendMessage,
    message,
    newChatName,
    selectedChat,
    selectedUsers,
    showModal,
    usernames,
  } = useMessagesHook();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MAX_WIDTH);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function renderConversations() {
    if (isMobile) {
      if (selectedChat) {
        return (
          <ChatSection
            onGoBack={onGoBack}
            isMobile={true}
            chatListRef={chatListRef}
            lockSendMessage={lockSendMessage}
            message={message}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
            selectedChat={selectedChat}
            username={username}
          />
        );
      }

      return (
        <ConversationList
          handleChangeChat={handleChangeChat}
          handleModal={handleModal}
          isLoading={isLoading}
          onPressLogout={logout}
        />
      );
    }

    return (
      <>
        <ConversationList
          handleChangeChat={handleChangeChat}
          handleModal={handleModal}
          isLoading={isLoading}
          onPressLogout={logout}
        />
        <ChatSection
          chatListRef={chatListRef}
          lockSendMessage={lockSendMessage}
          message={message}
          onMessageChange={onMessageChange}
          onSendMessage={onSendMessage}
          selectedChat={selectedChat}
          username={username}
        />
      </>
    );
  }

  return (
    <MainScreen>
      <Container>
        {renderConversations()}
        <NewConversationModal
          handleCreateChat={handleCreateChat}
          handleModal={handleModal}
          handleUserSelection={handleUserSelection}
          newChatName={newChatName}
          onChangeChatName={onChangeChatName}
          selectedUsers={selectedUsers}
          showModal={showModal}
          usernames={usernames}
        />
      </Container>
    </MainScreen>
  );
};

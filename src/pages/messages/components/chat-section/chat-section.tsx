import { FormatDate } from "../../../../constants";
import { Conversation } from "../../../../types/conversation";
import { IoIosArrowBack } from "react-icons/io";
import {
  AuthorMessage,
  Button,
  ChatHeader,
  ChatSectionContainer,
  Message,
  MessageContainer,
  MessageDate,
  MessageInput,
  MessageInputContainer,
  Messages,
  NoChatSelected,
  Participants,
} from "./chat-section.styles";

type Props = {
  selectedChat: Conversation | undefined;
  username: string | null;
  message: string;
  lockSendMessage: boolean;
  chatListRef: React.RefObject<HTMLDivElement>;
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onGoBack?: () => void;
  isMobile?: boolean;
};

export const ChatSection = (
  {
    chatListRef,
    lockSendMessage,
    message,
    onMessageChange,
    onSendMessage,
    selectedChat,
    username,
    isMobile = false,
    onGoBack,
  }: Props,
) => {
  return (
    <ChatSectionContainer>
      {selectedChat
        ? (
          <>
            {isMobile && <IoIosArrowBack onClick={onGoBack} size={24} />}
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
    </ChatSectionContainer>
  );
};

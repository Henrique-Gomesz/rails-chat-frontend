import { CiLogout } from "react-icons/ci";
import ChatSkeleton from "../../../../components/skeletons/skeleton-chat";
import {
  AddChatButton,
  ChatDate,
  ChatItem,
  ChatList,
  ConversationButtonsContainer,
  EmptyConversations,
  Sidebar,
  Title,
} from "./conversation-list.styles";
import { FormatDate } from "../../../../constants";
import { Conversation } from "../../../../types/conversation";
import { conversationsAtom } from "../../../../store/store";
import { useAtomValue } from "jotai";

type Props = {
  isLoading: boolean;
  handleChangeChat: (conversation: Conversation) => void;
  onPressLogout: () => void;
  handleModal: () => void;
};

export const ConversationList = (
  { handleChangeChat, handleModal, isLoading, onPressLogout }: Props,
) => {
  const conversations = useAtomValue(conversationsAtom);

  function renderConversations() {
    if (conversations.length) {
      return conversations.map((chat) => (
        <ChatItem
          key={chat.id}
          onClick={() => handleChangeChat(chat)}
        >
          {chat.name}
          <ChatDate>Criado em</ChatDate>
          <ChatDate>{FormatDate(chat.createdAt, false)}</ChatDate>
        </ChatItem>
      ));
    }

    return (
      <EmptyConversations>
        Nenhuma conversa encontrada.<br />
        <br />Para criar uma conversa clique no botão +
      </EmptyConversations>
    );
  }

  return (
    <Sidebar>
      <Title>Conversas</Title>
      <ChatList>
        {isLoading ? <ChatSkeleton /> : renderConversations()}
      </ChatList>
      <ConversationButtonsContainer>
        <CiLogout
          onClick={onPressLogout}
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
};

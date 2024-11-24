import styled from "styled-components";

export const Sidebar = styled.div`
  @media (max-width: 725px) {
    width: 100%;
  }
  width: 300px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ddd;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ChatList = styled.div`
  list-style: none;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  scrollbar-width: thin; /* For modern browsers */
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px; /* Scrollbar width for webkit-based browsers */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ChatDate = styled.div`
  color: gray;
  font-size: 12px;
`;

export const ConversationButtonsContainer = styled.div`
  padding-top: 16px;
  gap: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: auto
`;

export const AddChatButton = styled.button`
  background-color: #cb141c;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #a5141c
  }
`;

export const ChatItem = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const EmptyConversations = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  font-size: 24px;
  color: #ccc;
`;

export const Title = styled.h3``;

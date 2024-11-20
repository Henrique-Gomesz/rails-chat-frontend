import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ddd;
  position: relative;
display: flex;
  flex-direction: column;
`;

export const ChatList = styled.div`
  list-style: none;
  padding: 0;
  max-height: calc(100vh - 80px); /* Adjust height based on header or padding */
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

export const ChatDate = styled.div`
  color: gray;
  font-size: 12px;
`;

export const ConversationButtonsContainer = styled.div`
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

export const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;

`;

export const ChatHeader = styled.h2`
  font-size: 24px;
  color: #333;
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Participants = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  color: #8f8f8f;
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
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

export const MessageContainer = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Message = styled.div<{ isUserMessage: boolean }>`
  background-color: ${(props) => props.isUserMessage ? "#fafafa" : "#dddcdc"};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  line-break: anywhere;
`;

export const MessageDate = styled.div`
  color: gray;
  font-size: 12px;
`;

export const AuthorMessage = styled.div`
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const MessageInputContainer = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-direction: row;
`;

export const MessageInput = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const NoChatSelected = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 18px;
  margin-top: 50px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

export const ModalBody = styled.div`
  margin-top: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const UserList = styled.ul`
  list-style: none;
  padding: 0;
  overflow-y: auto;
  max-height: 200px;
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

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 0;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #c81418;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #a5141c
  }
`;

import styled from "styled-components";

export const ChatSectionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;

`;

export const ChatHeader = styled.h2`
  font-size: 24px;
  color: #333;
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

export const AuthorMessage = styled.div`
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const MessageDate = styled.div`
  color: gray;
  font-size: 12px;
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

export const NoChatSelected = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 18px;
  margin-top: 50px;
`;

export const Message = styled.div<{ isUserMessage: boolean }>`
  background-color: ${(props) => props.isUserMessage ? "#fafafa" : "#dddcdc"};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  line-break: anywhere;
`;

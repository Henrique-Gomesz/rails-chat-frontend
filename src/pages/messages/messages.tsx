import React, { useEffect, useState } from "react";
import {
  AddChatButton,
  Button,
  ChatHeader,
  ChatItem,
  ChatList,
  ChatSection,
  Checkbox,
  Container,
  Input,
  Message,
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
import { getAllUsernames } from "../../service/conversation-service";

interface Chat {
  id: number;
  name: string;
  messages: string[];
}

export const MessagesPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newChatName, setNewChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usernames,setUsernames] = useState<string[]>([]);

  useEffect(() => {
    getAllUsernames().then((data) => setUsernames(data));
  },[])

  const users: string[] = ["João", "Maria", "Carlos", "Ana", "Felipe"];

  const chats: Chat[] = [
    { id: 1, name: "João", messages: ["Oi, tudo bem?", "Como você está?"] },
    {
      id: 2,
      name: "Maria",
      messages: ["Oi, Henrique!", "Como vai o projeto?"],
    },
  ];

  const handleUserSelection = (user: string) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const handleCreateChat = () => {
    if (newChatName.trim() && selectedUsers.length) {
      const newChat: Chat = {
        id: chats.length + 1,
        name: newChatName,
        messages: [],
      };
      chats.push(newChat);
      setShowModal(false);
      setSelectedUsers([]);
      setNewChatName("");
    }
  };

  return (
    <Container>
      <Sidebar>
        <ChatList>
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
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
                  <Message key={index}>{message}</Message>
                ))}
              </Messages>
              <MessageInput placeholder="Digite uma mensagem..." />
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

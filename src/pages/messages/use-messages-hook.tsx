import { useEffect, useMemo, useRef, useState } from "react";
import {
  createConversation,
  getAllUsernames,
  getConversations,
  sendMessage,
} from "../../service/conversation-service";
import { Conversation } from "../../types/conversation";
import { useAtom } from "jotai";
import { conversationsAtom } from "../../store/store";
import { useNavigate } from "react-router-dom";

type UseMessagesHook = {
  conversations: Conversation[];
  showModal: boolean;
  newChatName: string;
  selectedUsers: string[];
  usernames: string[];
  message: string;
  lockSendMessage: boolean;
  isLoading: boolean;
  chatListRef: React.RefObject<HTMLDivElement>;
  selectedChat: Conversation | undefined;
  onChangeChatName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserSelection: (user: string) => void;
  handleCreateChat: () => void;
  handleChangeChat: (chat: Conversation) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleModal: () => void;
  logout: () => void;
};

export const useMessagesHook = (): UseMessagesHook => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useAtom(conversationsAtom);
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newChatName, setNewChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [lockSendMessage, setLockSendMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const chatListRef = useRef<HTMLDivElement>(null);

  const selectedChat = useMemo(() => {
    return conversations.find((chat) => chat.conversationId === selectedChatId);
  }, [conversations, selectedChatId]);

  function onChangeChatName(event: React.ChangeEvent<HTMLInputElement>) {
    setNewChatName(event.target.value);
  }

  useEffect(() => {
    getConversations().then((data) => {
      setConversations(() => data);
    }).finally(() => {
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

  function handleModal() {
    setShowModal((prev) => !prev);
  }

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
    navigate("/login");
  }

  return {
    handleModal,
    logout,
    conversations,
    showModal,
    newChatName,
    selectedUsers,
    usernames,
    message,
    lockSendMessage,
    isLoading,
    chatListRef,
    selectedChat,
    onChangeChatName,
    handleUserSelection,
    handleCreateChat,
    handleChangeChat,
    onSendMessage,
    onMessageChange,
  };
};

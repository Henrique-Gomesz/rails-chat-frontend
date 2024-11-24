import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UserItem,
  UserList,
} from "./new-conversation-modal.styles";

type Props = {
  showModal: boolean;
  newChatName: string;
  usernames: string[];
  selectedUsers: string[];
  onChangeChatName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserSelection: (user: string) => void;
  handleCreateChat: () => void;
  handleModal: () => void;
};

export const NewConversationModal = (
  {
    handleCreateChat,
    handleModal,
    handleUserSelection,
    newChatName,
    onChangeChatName,
    selectedUsers,
    showModal,
    usernames,
  }: Props,
) => {
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
};

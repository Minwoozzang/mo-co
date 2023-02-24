import { useState } from 'react';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';

const ChatWindow = ({ handleMocoChatOpen }) => {
  const [inputValue, setInputValue] = useState('');
  const messages = ['안녕', '안녕하세요', '반가워요', '반가워요!'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // inputValue 값을 서버에 보내는 로직
    setInputValue('');
  };

  return (
    <ChatWindowContainer>
      <Header>
        <MocoProfile>
          <MocoImg />
          <MocoName>모코</MocoName>
        </MocoProfile>
        <IoCloseOutline
          style={{ cursor: 'pointer' }}
          onClick={handleMocoChatOpen}
        />
      </Header>

      <MessageList>안녕하세요 모코입니다 :)</MessageList>
      {/* <MessageList>
        {messages.map((message) => (
          <Message key={message.id} isMine={message.isMine}>
            {message.content}
          </Message>
        ))}
      </MessageList> */}

      <MessageInputForm onSubmit={handleSubmit}>
        <MessageInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <MessageSubmitButton type="submit">전송</MessageSubmitButton>
      </MessageInputForm>
    </ChatWindowContainer>
  );
};

const ChatWindowContainer = styled.div`
  width: 370px;
  height: 626px;
  position: fixed;
  bottom: 130px;
  right: 120px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  z-index: 9999;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 10px;
`;

const MocoProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MocoImg = styled.div`
  background-color: #6758ff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const MocoName = styled.div``;

const MessageList = styled.ul`
  list-style: none;
  padding: 24px;
  height: 450px;
  overflow-y: scroll;
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-bottom: 1px solid black;
`;

const Message = styled.li`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;

const MessageInputForm = styled.form`
  display: flex;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100px;
  outline: none;
  font-size: 15px;
`;

const MessageSubmitButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  background-color: #6758ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export default ChatWindow;

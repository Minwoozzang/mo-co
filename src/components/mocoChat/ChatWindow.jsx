import { useState } from 'react';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import moco from '../../assets/mocoChat/moco.png';

const ChatWindow = ({ handleMocoChatOpen }) => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  console.log(response);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const messages = [
    {
      id: 1,
      content:
        '안녕하세요? 저는 모코입니다. 오늘은 기분이 좋아 보여요! 무슨 좋은 일이라도?',
      isMine: false,
    },
    { id: 2, content: `${inputValue}`, isSent: true },
    { id: 3, content: `${response}`, isSent: false },
    { id: 4, content: '반가워요!', isSent: true },
    { id: 5, content: '반가워요!', isSent: false },
    { id: 6, content: '반가워요!', isSent: true },
    { id: 7, content: '반가워요!', isSent: false },
    { id: 8, content: '반가워요!', isSent: true },
    { id: 9, content: '반가워요!', isSent: false },
    { id: 10, content: '반가워요!', isSent: true },
  ];

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setIsError(false);
    setIsDone(false);

    const API_KEY = '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';
    const ENDPOINT = `https://api.openai.com/v1/completions`;

    const requestData = {
      prompt: inputValue,
      model: 'text-davinci-003',
      max_tokens: 1000,
    };

    try {
      const response = await axios.post(ENDPOINT, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      setResponse(response.data.choices[0].text);
      setIsDone(true);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatWindowContainer>
      <Header>
        <MocoProfile>
          <MocoImg />
          <MocoName>모코</MocoName>
        </MocoProfile>
        <IoCloseOutline
          size="20"
          style={{ cursor: 'pointer', color: '#464646' }}
          onClick={handleMocoChatOpen}
        />
      </Header>

      <MessageList>
        {messages.map((message) => (
          <Message key={message.id} isSent={message.isSent}>
            {message.content}
          </Message>
        ))}
      </MessageList>

      <MessageInputForm onSubmit={handleSubmit}>
        <MessageInput
          type="text"
          value={inputValue}
          onChange={handleChange}
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
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  z-index: 9999;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  padding: 10px;
  background-color: #feff80;
  border-radius: 20px 20px 0 0;
`;

const MocoProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MocoImg = styled.div`
  width: 48px;
  height: 56px;
  background-image: url(${moco});
  background-size: cover;
  margin: 0 10px;
`;

const MocoName = styled.div`
  font-size: 20px;
`;

const MessageList = styled.div`
  list-style: none;
  padding: 24px;
  height: 400px;
  overflow-y: scroll;
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-bottom: 1px solid #cecece;
`;

const Message = styled.div`
  max-width: 80%;
  clear: both;
  float: ${(message) => (message.isSent ? 'right' : 'left')};
  margin: 10px;
  background-color: ${(message) => (message.isSent ? '#000000' : '#feff80')};
  color: ${(message) => (message.isSent ? '#ffffff' : '#000000')};
  font-size: 15px;
  border-radius: 10px;
  padding: 8px 12px;
`;

const MessageInputForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 5px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  outline: none;
  font-size: 15px;
`;

const MessageSubmitButton = styled.button`
  width: 56px;
  padding: 10px;
  margin-left: 10px;
  background-color: #e7e7e7;
  color: #6c6c6c;
  border: 1px solid #cecece;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export default ChatWindow;

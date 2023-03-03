import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import moco from '../../assets/mocoChat/moco.png';
import loading from '../../assets/mocoChat/moco_thinking2.png';
import error from '../../assets/mocoChat/moco_breakdown.png';
import { useQuery } from 'react-query';

const ChatWindow = ({ handleMocoChatOpen, uid }) => {
  const [inputValue, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const scrollEnd = useRef();
  // 처음 모코챗 열면, 로컬스토리지 세팅하기
  if (!localStorage.getItem(`chat_${uid}`)) {
    localStorage.setItem(
      `chat_${uid}`,
      JSON.stringify([
        {
          content:
            '안녕하세요! 저는 모코입니다. 공부하다 궁금한 건 저에게 물어보세요!',
          isSent: false,
          id: Date.now(),
        },
      ]),
    );
  }
  // 메시지 배열 상태
  const [messageArr, setMessageArr] = useState(
    JSON.parse(localStorage.getItem(`chat_${uid}`)),
  );
  console.log('스테이트', messageArr);
  console.log('로컬스토리지', JSON.parse(localStorage.getItem(`chat_${uid}`)));

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setIsError(false);

    const API_KEY = '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';
    const ENDPOINT = `https://api.openai.com/v1/completions`;

    const requestData = {
      prompt: inputValue,
      model: 'text-davinci-003',
      max_tokens: 2000,
    };

    const existingMessage = JSON.parse(localStorage.getItem(`chat_${uid}`));

    existingMessage.push({
      content: inputValue,
      isSent: true,
      id: Date.now(),
    });

    // setMessageArr(existingMessage);

    localStorage.setItem(`chat_${uid}`, JSON.stringify(existingMessage));

    console.log(
      '🚀 ~ file: ChatWindow.jsx:40 ~ handleSubmit ~ existingMessage:',
      existingMessage,
    );

    try {
      // 결과 받아오기
      const response = await axios.post(ENDPOINT, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      existingMessage.push({
        content: response.data.choices[0].text.replace('\n\n', ''),
        isSent: false,
        id: Date.now(),
      });

      localStorage.setItem(`chat_${uid}`, JSON.stringify(existingMessage));

      setMessageArr(existingMessage);
    } catch (error) {
      setIsError(true);

      console.error(error);
    } finally {
      console.log('성공');
      setIsLoading(false);
    }
    console.log('비동기 끝');
  };

  useEffect(() => {
    scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageArr]);

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

      {isError ? (
        <MocoBack>
          <MocoError />
          <MocoErrorText onClick={handleSubmit}>
            네트워크 장애
            <br />
            클릭해서 재시도하기
          </MocoErrorText>
        </MocoBack>
      ) : (
        <MessageList>
          {isLoading ? <MocoLoading /> : null}
          {messageArr.map((message) => (
            <Message ref={scrollEnd} key={message.id} isSent={message.isSent}>
              {message.content}
            </Message>
          ))}
          <div ref={scrollEnd}></div>
        </MessageList>
      )}

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
  width: 2rem;
  height: 2.4rem;
  background-image: url(${moco});
  background-size: cover;
  margin: 0 10px;
`;

const MocoName = styled.div`
  font-size: 20px;
`;

const MocoLoading = styled.div`
  width: 5rem;
  height: 6.4rem;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${loading});
  background-size: cover;
  /* 정중앙에서 돌아가는 애니메이션 */
  animation: spin 2s linear infinite;
  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const MocoError = styled.div`
  width: 5rem;
  height: 7.7rem;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${error});
  background-size: cover;
  animation: shake 0.1s linear infinite;
  @keyframes shake {
    from {
      transform: translate(-50%, -50%) rotate(-1deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(1deg);
    }
  }
`;

const MocoErrorText = styled.div`
  text-decoration: underline;
  text-decoration-color: #feff80;
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
  font-size: 1.1rem;
  color: #ff80bf;
  text-align: center;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
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

const MocoBack = styled.div`
  height: 400px;
  background-color: #000000f0;
`;

const Message = styled.div`
  max-width: 80%;
  clear: both;
  float: ${(message) => (message.isSent ? 'right' : 'left')};
  white-space: pre-line;
  margin: 10px;
  background-color: ${(message) => (message.isSent ? '#000000' : '#feff80')};
  color: ${(message) => (message.isSent ? '#ffffff' : '#000000')};
  font-size: 15px;
  border-radius: 10px;
  padding: 10px 12px;
  line-height: 1.4;
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

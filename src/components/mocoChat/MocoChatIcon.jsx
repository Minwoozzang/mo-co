import styled from '@emotion/styled';
import { useState } from 'react';
import ChatWindow from './ChatWindow';

const MocoChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleMocoChatOpen = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* <MocoChatIcon onClick={handleMocoChatOpen} /> */}
      <img
        src="images/moco.png"
        alt="chat"
        width="120px"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          borderRadius: '50%',
        }}
        onClick={handleMocoChatOpen}
      />
      {isChatOpen && <ChatWindow handleMocoChatOpen={handleMocoChatOpen} />}
    </>
  );
};

export default MocoChat;

const MocoChatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #6758ff;
  position: fixed;
  bottom: 30px;
  right: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  &:hover {
    cursor: pointer;
  }
`;

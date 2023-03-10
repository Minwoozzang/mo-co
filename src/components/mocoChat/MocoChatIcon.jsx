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
      <img
        src="https://i.imgur.com/gMG1fOm.png"
        alt="chat"
        width="65rem"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          cursor: 'pointer',
        }}
        onClick={handleMocoChatOpen}
      />
      {isChatOpen && <ChatWindow handleMocoChatOpen={handleMocoChatOpen} />}
    </>
  );
};

export default MocoChat;

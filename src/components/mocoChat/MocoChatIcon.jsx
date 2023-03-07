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
        src="images/moco.png"
        alt="chat"
        width="120px"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={handleMocoChatOpen}
      />
      {isChatOpen && <ChatWindow handleMocoChatOpen={handleMocoChatOpen} />}
    </>
  );
};

export default MocoChat;

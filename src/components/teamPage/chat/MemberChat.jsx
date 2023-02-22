import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import MessageBox from './MessageBox';
import { v4 } from 'uuid';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../common/firebase';

export default function MemberChat() {
  // 스크롤
  const scrollRef = useRef(null);

  const scrollEvent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 메시지 정보 가져오기
  const [AddMessage, setAddtMessage] = useState([]);

  const getChatMessage = () => {
    const q = query(collection(db, 'teamChat'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddtMessage(newInfo);
      console.log(AddMessage);
    });

    return unsubscribe;
  };

  useEffect(() => {
    getChatMessage();
    scrollEvent();
  }, []);

  return (
    <ContentChatContainer>
      <ContentTitle>
        <MessageHeader />
      </ContentTitle>
      <SideWrapper>
        <ContentChatArea ref={scrollRef}>
          {/* {AddMessage.map((team) => {
            return <MessageBox key={v4()} team={team} />;
          })} */}
        </ContentChatArea>
        <hr />
        <MessageForm />
      </SideWrapper>
    </ContentChatContainer>
  );
}

const ContentChatContainer = styled.div`
  width: 700px;
  height: 100%;

  padding: 30px;
`;

const ContentTitle = styled.div`
  text-decoration: none;
  color: #fff;
  font-size: 19px;
  font-weight: 600;
`;

export const SideWrapper = styled.div`
  width: 100%;
  height: 600px;

  border-bottom: 1px solid var(--border-color);
  border-radius: 25px;

  background-color: white;
  margin-top: 40px;
`;

const ContentChatArea = styled.div`
  width: 100%;
  height: 480px;

  border-radius: 20px;

  overflow: scroll;

  /* ::-webkit-scrollbar {
    width: 5px;
  } */
`;

import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { authService, db } from '../../../common/firebase';
import MessageHeader from './MessageHeader';
import { onAuthStateChanged } from 'firebase/auth';
import MessageBox from './MessageBox';
import { v4 } from 'uuid';
import styled from '@emotion/styled';

const MemberChatingRoom = ({ teamLocationID }) => {
  // 스크롤 Ref
  const scrollRef = useRef();

  // 유저 정보 가져오기
  const [chatUserImage, setChatUserImage] = useState('');

  const getUserChatInfo = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatUserImage(newInfo[0]?.profileImg);
    });

    return unsubscribe;
  };

  // 기존 채팅 내용
  const [chatInfo, setChatInfo] = useState([]);
  const [AddMessage, setAddtMessage] = useState([]);

  const getChatID = () => {
    const q = query(
      collection(db, 'teamChat'),
      where('teamID', '==', teamLocationID),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatInfo(newInfo[0]?.message);
      setAddtMessage(newInfo[0]?.message);
    });

    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        getUserChatInfo();
        getChatID();
      }
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }, []);

  // 텍스트 value 값
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  // Enter키 실행
  const EnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // 메세지 데이터 올리기
  const handleSubmit = async () => {
    if (content !== '') {
      await updateDoc(doc(db, 'teamChat', teamLocationID), {
        message: [
          ...chatInfo,
          {
            comment: content,
            uid: authService.currentUser.uid,
            profileImg: chatUserImage,
            nickName: authService.currentUser.displayName,
          },
        ],
      });
    }

    setContent('');
  };

  return (
    <ContentChatContainer>
      <ContentTitle>
        <MessageHeader />
      </ContentTitle>
      <ContentChatAreaBox>
        <ContentChatArea>
          <MessageBox key={v4()} t={AddMessage} />
          <div ref={scrollRef} />
        </ContentChatArea>
        <ChatFormSection>
          <ChatInputBody>
            <ChatInput
              type="text"
              value={content}
              onChange={handleChange}
              onKeyPress={EnterKeyPress}
            />
            <ChatBtn onClick={handleSubmit}>
              <SendBtn>전송</SendBtn>
            </ChatBtn>
          </ChatInputBody>
        </ChatFormSection>
      </ContentChatAreaBox>
    </ContentChatContainer>
  );
};

export default MemberChatingRoom;

const SendBtn = styled.div`
  width: 85px;
  height: 35px;
  background-color: #232323;
  border-radius: 5px;
  position: absolute;
  color: white;
  padding: 8px;
  text-align: center;
`;

const ContentChatContainer = styled.div`
  width: 650px;
  height: 100%;
  padding: 30px;
  background-color: white;
`;

const ContentTitle = styled.div`
  text-decoration: none;
  font-size: 19px;
  font-weight: 600;
  margin-top: 10px;
`;

const ContentChatAreaBox = styled.div`
  background-color: white;
  border-radius: 20px;
  margin-top: 25px;
  -ms-overflow-style: none;

  padding: 10px;
  height: 85%;
`;

const ContentChatArea = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-bottom: 1px solid rgba(185, 185, 185, 0.3);
`;

const ChatFormSection = styled.div`
  width: 100%;
  height: 120px;

  display: flex;
`;

const ChatInputBody = styled.div`
  width: 100%;
  height: 100%;
`;

const ChatInput = styled.input`
  width: 100%;
  height: 90%;

  padding-left: 5px;

  font-size: 1.3rem;

  border: none;
  border-radius: 20px;

  :focus-visible {
    outline: none;
  }
`;

export const ChatBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

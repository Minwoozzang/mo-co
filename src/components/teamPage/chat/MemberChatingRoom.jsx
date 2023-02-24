import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { authService, db } from '../../../common/firebase';
import MessageHeader from './MessageHeader';
import { IoMdSend } from 'react-icons/io';
import { onAuthStateChanged } from 'firebase/auth';
import MessageBox from './MessageBox';
import { v4 } from 'uuid';
import styled from '@emotion/styled';

const MemberChatingRoom = ({ teamLocationID }) => {
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
    // const beforeChat = chatInfo.filter((t) => t.id === teamLocationID);
    // const beforeChatMessage = beforeChat[0].message;
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
    setContent('');
  };

  return (
    <ContentChatContainer>
      <ContentTitle>
        <MessageHeader />
      </ContentTitle>
      <ContentChatAreaBox>
        <ContentChatArea>
          {AddMessage.map((t) => {
            return <MessageBox key={v4()} t={t} />;
          })}
        </ContentChatArea>
        <ChatFormSection>
          <ChatInputBody>
            <ChatInput
              type="text"
              value={content}
              onChange={handleChange}
              onKeyPress={EnterKeyPress}
            />
          </ChatInputBody>

          {/* TODO: 텍스트 값이 있는 경우에만 전송 버튼 나오게 */}
          <ChatBtn onClick={handleSubmit}>
            <IoMdSend style={{ fontSize: '30px', color: '#343645' }} />
          </ChatBtn>
        </ChatFormSection>
      </ContentChatAreaBox>
    </ContentChatContainer>
  );
};

export default MemberChatingRoom;

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

const ContentChatAreaBox = styled.div`
  background-color: white;
  border-radius: 20px;
  margin-top: 25px;
  overflow-y: scroll;
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-bottom: 1px solid black;
  padding: 10px;
`;

const ContentChatArea = styled.div`
  width: 100%;
  height: 480px;
  overflow-y: scroll;
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-bottom: 1px solid black;
`;

const ChatFormSection = styled.div`
  width: 100%;
  height: 120px;

  display: flex;
`;

const ChatInputBody = styled.div`
  width: 90%;
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
`;

import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { authService, db } from '../../../common/firebase';
import {
  ChatFormSection,
  ChatInputBody,
  ChatInput,
  ChatBtn,
} from './messageFormStyle';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { message } from 'antd';

const MessageForm = ({ teamLocationID }) => {
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

  const getChatID = () => {
    const q = query(collection(db, 'teamChat'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatInfo(newInfo);
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
    const beforeChat = chatInfo.filter((t) => t.id === teamLocationID);
    const beforeChatMessage = beforeChat[0].message;
    await updateDoc(doc(db, 'teamChat', teamLocationID), {
      message: [
        ...beforeChatMessage,
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
  );
};

export default MessageForm;

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

const MessageForm = () => {
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

  // TODO: 팀 id 가져오기
  const [chatID, setChatID] = useState([]);
  const [chatInfo, setChatInfo] = useState([]);

  const getChatID = () => {
    const q = query(collection(db, 'teamChat'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatID(newInfo[0]?.id);
      setChatInfo(newInfo[0]?.message);
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

  const handleSubmit = async () => {
    // TODO: 추후에 Room ID로 변경

    await updateDoc(doc(db, 'teamChat', chatID), {
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

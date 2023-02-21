import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { authService, db } from '../../common/firebase';
import {
  doc,
  updateDoc,
  query,
  collection,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ContentRule() {
  const [content, setContent] = useState('');
  const [convert, setConvert] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  // post에서 uid 받아오기
  const [idUid, setidUid] = useState([]);
  const postGetTeamID = () => {
    const q = query(
      collection(db, 'post'),
      where('uid', '==', authService.currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setidUid(newInfo[0]?.uid);
    });
    return unsubscribe;
  };

  // 팀 아이디 받아오기
  const [teamID, setTeamID] = useState([]);
  const [contentInfo, setContentInfo] = useState([]);
  const teamGetTeamID = () => {
    const q = query(collection(db, 'teamPage'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamID('24ddd57a-c511-4732-be77-dfa5651b2249');
      setContentInfo(newInfo);
    });
    return unsubscribe;
  };

  // 유저에서 팀 id 받아오기
  const [userTeamID, setUserTeamID] = useState([]);
  const userGetTeamID = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTeamID(newInfo);
    });
    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setCurrentUserId(authService.currentUser.uid);
        postGetTeamID();
        teamGetTeamID();
        userGetTeamID();
      }
    });
  }, []);

  const isOwner = idUid === currentUserId ? true : false;

  const convertChange = () => {
    setConvert(!convert);
  };
  const updateContentRule = async () => {
    if (convert) {
      const newContentField = {
        contentRule: content,
      };
      try {
        await updateDoc(doc(db, 'teamPage', teamID), newContentField);
      } catch (e) {
        console.log(e);
      } finally {
        console.log('end');
      }
    }
    convertChange();
  };
  return (
    <div>
      <ButtonPlaceTitleWrap>
        <ContentTitle>📌 모임 공지</ContentTitle>
        {isOwner && (
          <>
            <SubmitBtn onClick={updateContentRule} type="submit">
              작성
            </SubmitBtn>
          </>
        )}
      </ButtonPlaceTitleWrap>
      <TextAreaWrapper>
        {convert ? (
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="text"
            placeholder="내용을 입력하세요"
            value={content}
          />
        ) : (
          <ContentCard>
            <div>
              {contentInfo
                .filter(
                  (item) => item.id === '24ddd57a-c511-4732-be77-dfa5651b2249',
                )
                .map((item) => {
                  return <div key={item.id}>{item.contentRule}</div>;
                })}
            </div>
          </ContentCard>
        )}
      </TextAreaWrapper>
    </div>
  );
}

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 0.7rem;
  }
  .text {
    width: 100%;
    height: 200px;
  }

  input,
  textarea {
    &::-webkit-scrollbar {
      display: none;
    }

    resize: none;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    transition: border 1s;
    padding: 5px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 3px solid skyblue;
    }
  }
`;

const SubmitBtn = styled.button`
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  width: 50px;
  height: 30px;
  text-align: center;
  align-items: center;
  font-size: 15px;
  border: none;
  background-color: transparent;
  color: grey;
`;

const ContentCard = styled.div`
  width: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.4s;
  height: 30vh;
  background-color: whitesmoke;
  p {
    padding: 20px;
  }
`;

const ButtonPlaceTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ContentTitle = styled.a`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 20px;
  margin-top: 20px;
`;

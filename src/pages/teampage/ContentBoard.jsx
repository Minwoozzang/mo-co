import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { authService, db } from '../../common/firebase';
import {
  doc,
  updateDoc,
  query,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ContentBoard() {
  const [teamID, setTeamID] = useState([]);

  // 보드 내용
  const [boardContent, setBoardContent] = useState('');

  // 팀 아이디 받아오기
  const [boardContentInfo, setBoardContentInfo] = useState([]);
  const teamGetTeamID = () => {
    const q = query(collection(db, 'teamPage'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamID(newInfo[0]?.id);
      setBoardContentInfo(newInfo);
    });
    return unsubscribe;
  };

  const [convert, setConvert] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        teamGetTeamID();
      }
    });
  }, []);

  const convertChange = () => {
    setConvert(!convert);
  };
  const updateContentBoard = async () => {
    if (convert) {
      const newContentField = {
        contentBoard: boardContent,
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
        <ContentTitle>📍 모임 보드</ContentTitle>
        <SubmitBtn onClick={updateContentBoard} type="submit">
          작성
        </SubmitBtn>
      </ButtonPlaceTitleWrap>
      <TextAreaWrapper>
        {convert ? (
          <textarea
            onChange={(e) => {
              setBoardContent(e.target.value);
            }}
            className="text"
            placeholder="내용을 입력하세요"
            value={boardContent}
          />
        ) : (
          <ContentCard>
            <div>
              {boardContentInfo
                .filter(
                  (item) => item.id === '24ddd57a-c511-4732-be77-dfa5651b2249',
                )
                .map((item) => {
                  return <div key={item.id}>{item.contentBoard}</div>;
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

const ContentCard = styled.div`
  width: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.4s;
  height: 58vh;
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

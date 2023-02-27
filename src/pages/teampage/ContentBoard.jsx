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

export default function ContentBoard({ teamLocationID }) {
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
        await updateDoc(doc(db, 'teamPage', teamLocationID), newContentField);
      } catch (e) {
        console.log(e);
      } finally {
        console.log('end');
      }
    }
    convertChange();
  };

  return (
    <>
      <ContentCard>
        <ButtonPlaceTitleWrap>
          <ContentTitle>모임 보드</ContentTitle>
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
            <>
              {boardContentInfo
                .filter((item) => item.id === teamLocationID)
                .map((item) => {
                  return (
                    <>
                      <textarea disabled key={item.id}>
                        {item.contentBoard}
                      </textarea>
                    </>
                  );
                })}
            </>
          )}
        </TextAreaWrapper>
      </ContentCard>
    </>
  );
}

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .text {
    width: 100%;
    height: 510px;
  }

  input,
  textarea {
    &::-webkit-scrollbar {
      display: none;
    }

    resize: none;
    font-size: 16px;
    font-weight: 500;
    border: none;
    height: 500px;
    border-radius: 5px;
    transition: border 1s;
    padding: 20px;
    box-sizing: border-box;
    white-space: pre-line;
    &:focus {
      outline: none;
      border: 2px solid skyblue;
      border-radius: 15px;
    }
  }
`;

const ContentCard = styled.div`
  width: 100%;
  position: relative;
  border-radius: 20px;
  overflow-y: auto;
  transition: 0.4s;
  height: 67vh;
  background-color: white;
  margin-top: 25px;
  p {
    padding: 20px;
  }
`;

const ButtonPlaceTitleWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #232323;
`;

const ContentTitle = styled.a`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  color: white;
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

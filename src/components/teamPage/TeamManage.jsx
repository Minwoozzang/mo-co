import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import styled from '@emotion/styled';
import { db, authService } from '../../common/firebase';
import {
  query,
  onSnapshot,
  collection,
  doc,
  getDoc,
  where,
} from 'firebase/firestore';

export default function TeamManage({ teamLocationID }) {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = authService.currentUser;
  const [postIdInfo, setPostIdInfo] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    getPostData();
    teamGetTeamID();
  }, []);

  const getPostData = async () => {
    const postRef = await doc(db, 'post', id);
    getDoc(postRef)
      .then((doc) => {
        if (doc.exists()) {
          console.log('Document data:', doc.data());

          setPostIdInfo(doc.data().teamID);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  // 팀 아이디 받아오기
  const [teamID, setTeamID] = useState([]);
  const teamGetTeamID = () => {
    const q = query(collection(db, 'teamPage'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        ids: doc.id,
        ...doc.data(),
      }));
      setTeamID(newInfo);
    });
    return unsubscribe;
  };

  const navigateWrite = () => {
    navigate(`/edit/${teamLocationID}`);
  };

  return (
    <>
      <Social
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <DropdownOptions />
      </Social>
      {showOptions === true ? (
        <>
          <DropdownOption>
            <SharePh onClick={navigateWrite}>모임 수정하기</SharePh>
            <SharePh>모임 삭제하기</SharePh>
          </DropdownOption>
        </>
      ) : null}
    </>
  );
}

const Social = styled.span`
  display: block;
`;

const DropdownOptions = styled(BsThreeDots)`
  font-size: 20px;
  margin-top: 1rem;
  color: black;
  cursor: pointer;
`;

const DropdownOption = styled.div`
  position: absolute;
  z-index: 1; /*다른 요소들보다 앞에 배치*/
  font-weight: 400;
  background-color: #f9f9f9;
  min-width: 150px;
  border-radius: 8px;
  padding: 15px;
  top: 100px;
`;

const SharePh = styled.div`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

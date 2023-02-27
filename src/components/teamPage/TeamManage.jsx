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
  updateDoc,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function TeamManage({ teamLocationID, item }) {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = authService.currentUser;
  const [postIdInfo, setPostIdInfo] = useState([]);
  const [teamPost, setTeamPost] = useState([]);
  const [myUid, setMyUid] = useState('');
  // 리더에게만 아이콘 보이게 하기
  const [onlyLeaderLook, setOnlyLeaderLook] = useState(false);

  const onlyLeader = () => {
    const mymyUid = currentUser.uid;
    setMyUid(mymyUid);

    if (item.teamLeader.uid === currentUser.uid) {
      setOnlyLeaderLook(true);
    } else {
      setOnlyLeaderLook(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        onlyLeader();
      }
    });
    if (!currentUser) return;
    getPostData();
    getFindTeamID();
    getFindTeamPostInfo();
  }, []);

  const [teamPage, setTeamPage] = useState([]);

  // teamPage 데이터 불러오기
  useEffect(() => {
    const teamPageCollectionRef = collection(db, 'teamPage');
    const q = query(teamPageCollectionRef);
    const getTeamPage = onSnapshot(q, (snapshot) => {
      const teamPageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamPage(teamPageData);
    });
    return getTeamPage;
  }, []);

  const getFindTeamID = () => {
    const q = query(collection(db, 'post'), where('teamID', '==', id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTeam = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamPost(newTeam[0].id);
    });
    return unsubscribe;
  };

  const navigateWrite = () => {
    navigate(`/edit/${teamPost}`);
  };

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

  // // 팀 아이디 받아오기
  // const [teamID, setTeamID] = useState([]);
  // const teamGetTeamID = () => {
  //   const q = query(collection(db, 'teamPage'));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const newInfo = snapshot.docs.map((doc) => ({
  //       ids: doc.id,
  //       ...doc.data(),
  //     }));
  //     setTeamID(newInfo);
  //   });
  //   return unsubscribe;
  // };

  const [teamPostInfo, setTeamPostInfo] = useState([]);
  const getFindTeamPostInfo = () => {
    const q = query(collection(db, 'teamPage'), where('teamID', '==', id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTeam = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamPostInfo(newTeam[0]);
    });
    return unsubscribe;
  };

  const deactivateAccount = async (uid) => {
    const otherMember = teamPostInfo.teamMember?.filter(
      (item) => item.uid !== myUid,
    );
    try {
      await updateDoc(doc(db, 'teamPage', id), {
        teamMember: otherMember,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    console.log('탈퇴', uid);
    updateDoc(doc(db, 'user', uid), {
      teamID: deleteDoc(),
    });
  };

  const deactivateRoom = async () => {
    try {
      await deleteDoc(doc(db, 'teamPage', teamLocationID));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
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
        onlyLeaderLook === true ? (
          <>
            <DropdownOption>
              <SharePh onClick={navigateWrite}>모임 수정하기</SharePh>
              <SharePh onClick={deactivateRoom}>모임 삭제하기</SharePh>
            </DropdownOption>
          </>
        ) : (
          <>
            <DropdownOption>
              <SharePh onClick={() => deactivateAccount(myUid)}>
                모임 탈퇴하기
              </SharePh>
            </DropdownOption>
          </>
        )
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
import { db, authService } from '../../common/firebase';
import {
  query,
  onSnapshot,
  collection,
  doc,
  getDoc,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { confirmAlert } from 'react-confirm-alert';

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

  // 나의 정보 가져오기
  const [myInfo, setMyInfo] = useState([]);
  const getMyUserInfo = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyInfo(newInfo[0]?.teamID.filter((t) => t !== teamLocationID));
    });
    return unsubscribe;
  };

  // teamPage 데이터 불러오기
  const [teamPage, setTeamPage] = useState([]);

  const getTeamPageInfo = () => {
    const q = query(
      collection(db, 'teamPage'),
      where('teamID', '==', teamLocationID),
    );
    const getTeamPage = onSnapshot(q, (snapshot) => {
      const teamPageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamPage(teamPageData[0]?.teamPartyStack.partyName);
    });
    return getTeamPage;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        onlyLeader();
        getMyUserInfo();
        getTeamPageInfo();
      }
    });
    if (!currentUser) return;
    getPostData();
    getFindTeamID();
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

  // 모임 수정하기
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
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  // 모임 탈퇴하기
  const deactivateAccount = async (uid) => {
    const memberCancelHandler = async (onClose) => {
      const otherMember = item.teamMember?.filter((item) => item.uid !== uid);
      try {
        await updateDoc(doc(db, 'teamPage', teamLocationID), {
          teamMember: otherMember,
        });
      } catch (error) {
        console.log(error);
      }
      await updateDoc(doc(db, 'user', uid), {
        teamID: myInfo,
      });
      onClose();
      navigate('/');
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <SettingBody>
            <SettingBoX>
              <Title>
                '{teamPage}' <br /> 모임을 탈퇴하시겠습니까?
              </Title>
              <BtnBox>
                <CloseBtn onClick={() => onClose()}>취소</CloseBtn>

                <CancelBtn onClick={() => memberCancelHandler(onClose)}>
                  탈퇴하기
                </CancelBtn>
              </BtnBox>
            </SettingBoX>
          </SettingBody>
        );
      },
    });
  };

  // 모임 폭파하기(방장)
  const deactivateRoom = async () => {
    const leaderCancelHandler = async (onClose) => {
      try {
        await deleteDoc(doc(db, 'teamPage', teamLocationID));
      } catch (error) {
        console.log(error);
      }
      await deleteDoc(doc(db, 'teamChat', teamLocationID));

      await updateDoc(doc(db, 'user', authService.currentUser.uid), {
        teamID: myInfo,
      });
      onClose();
      window.location.replace('/');
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <SettingBody>
            <SettingBoX>
              <Title>
                '{teamPage}' <br /> 모임을 폭파하시겠습니까?
              </Title>
              <BtnBox>
                <CloseBtn onClick={() => onClose()}>취소</CloseBtn>

                <CancelBtn onClick={() => leaderCancelHandler(onClose)}>
                  폭파하기
                </CancelBtn>
              </BtnBox>
            </SettingBoX>
          </SettingBody>
        );
      },
    });
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
              <SharePh onClick={deactivateRoom}>모임 폭파하기</SharePh>
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

const DropdownOptions = styled(IoSettingsOutline)`
  font-size: 25px;
  color: black;
  margin-bottom: 20px;
  cursor: pointer;
`;

const DropdownOption = styled.div`
  position: absolute;
  z-index: 1; /*다른 요소들보다 앞에 배치*/
  font-weight: 400;
  background-color: #f9f9f9;
  min-width: 150px;
  border-radius: 10px;

  top: 80px;
`;

const SharePh = styled.div`
  height: 40px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #e4e4e4;
  }
`;

// confirm UI
const SettingBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 990;
`;
const SettingBoX = styled.div`
  width: 400px;
  height: 195px;

  background: #232323;
  border-radius: 20px;
`;
const Title = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 21px;

  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;

  margin-top: 40px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;

  gap: 10px;

  margin-top: 32px;
`;
const CloseBtn = styled.div`
  width: 159px;
  height: 44px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 550;
  font-size: 1rem;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  border-radius: 5px;

  cursor: pointer;
`;
const CancelBtn = styled(CloseBtn)`
  color: #ffffff;

  background: #545454;
`;

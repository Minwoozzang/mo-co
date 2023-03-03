import { uuidv4 } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import {
  MemberInfoProfileImg,
  MemberPosition,
  MemberInfoProfile,
  MemberInfoProfileInfo,
  MemberInfoProfileName,
  MemberCancel,
} from './style';
import cancel from '../../../src/assets/icon/Icon_cancel.png';
import { authService, db } from '../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { confirmAlert } from 'react-confirm-alert';
import MemberCancelConfirmUI from './teamPageConfirm/MemberCancelConfirmUI';
import MyProfileConfirm from './teamPageConfirm/MyProfileConfirm';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const SideMemberList = ({ item, teamLocationID }) => {
  // 멤버 리스트
  const memberList = item.teamMember;

  // isWait가 false인 멤버
  const memberListUid = memberList
    .filter((t) => t.isWait === false)
    .map((t) => t.uid);

  // 팀 멤버 유저 정보 가져오기
  const [profileUserInfo, setProfileUserInfo] = useState([]);

  const getUserStackInfo = () => {
    const q = query(collection(db, 'user'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfileUserInfo(newInfo.filter((t) => memberListUid.includes(t.uid)));
    });

    return unsubscribe;
  };

  // 리더에게만 아이콘 보이게 하기
  const [onlyLeaderLook, setOnlyLeaderLook] = useState(false);

  const onlyLeader = () => {
    const myUid = authService.currentUser.uid;

    if (item.teamLeader.uid === myUid) {
      setOnlyLeaderLook(true);
    } else {
      setOnlyLeaderLook(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        onlyLeader();
        getUserStackInfo();
      }
    });
  }, []);

  // 멤버 프로필 보기
  const lookProfile = (data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <MyProfileConfirm
            onClose={onClose}
            data={data}
            id={item.id}
            teamLocationID={teamLocationID}
            item={item.teamMember}
          />
        );
      },
    });
  };

  // 강퇴
  const memberCancelHandler = (data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <MemberCancelConfirmUI
            onClose={onClose}
            data={data}
            id={item.id}
            item={item.teamMember}
          />
        );
      },
    });
  };

  return (
    <>
      {profileUserInfo.map((data) => {
        return (
          <MemberInfoProfile key={uuidv4()}>
            <MemberInfoProfileImg
              src={data.profileImg}
              onClick={() => lookProfile(data)}
            />
            <MemberInfoProfileInfo>
              <MemberInfoProfileName>{data.nickname}</MemberInfoProfileName>
              <MemberPosition>멤버</MemberPosition>
            </MemberInfoProfileInfo>
            {onlyLeaderLook ? (
              <MemberCancel
                src={cancel}
                onClick={() => memberCancelHandler(data)}
              />
            ) : (
              ''
            )}
          </MemberInfoProfile>
        );
      })}
    </>
  );
};

export default SideMemberList;

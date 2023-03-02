import { uuidv4 } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import {
  MemberInfoProfileImg,
  LeaderPosition,
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
            text="프로필 동기화"
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
      {memberList
        .filter((data) => data.isWait === false)
        .map((data) => {
          return (
            <MemberInfoProfile key={uuidv4()}>
              <MemberInfoProfileImg
                src={
                  data.profileImg
                    ? data.profileImg
                    : 'https://imhannah.me/common/img/default_profile.png'
                }
                onClick={() => lookProfile(data)}
              />
              <MemberInfoProfileInfo>
                <MemberInfoProfileName>{data.nickName}</MemberInfoProfileName>
                <LeaderPosition>{data.teamPositon}</LeaderPosition>
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

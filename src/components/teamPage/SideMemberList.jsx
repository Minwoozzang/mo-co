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
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { authService, db } from '../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { confirmAlert } from 'react-confirm-alert';
import MemberCancelConfirmUI from './MemberCancelConfirmUI';

const SideMemberList = ({ item }) => {
  // 멤버 리스트
  const memberList = item.teamMember;

  // 해당 멤버 UID
  const teamID = item.teamID;

  // 해당 유저 컬렉션에 팀 ID에 접근하기
  const [userTeamID, setUserTeamID] = useState([]);
  // const getUserTeamID = () => {
  //   const q = query(collection(db, 'user'), where('uid', '==', data.uid));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const newInfo = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setUserTeamID(newInfo[0]?.teamID.filter((a) => a !== teamID));
  //   });

  //   return unsubscribe;
  // };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // getUserTeamID();
      }
    });
  }, []);

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
              />
              <MemberInfoProfileInfo>
                <MemberInfoProfileName>{data.nickName}</MemberInfoProfileName>
                <LeaderPosition>{data.teamPositon}</LeaderPosition>
              </MemberInfoProfileInfo>
              <MemberCancel
                src={cancel}
                onClick={() => memberCancelHandler(data)}
              />
            </MemberInfoProfile>
          );
        })}
    </>
  );
};

export default SideMemberList;

import { uuidv4 } from '@firebase/util';
import React, { useEffect } from 'react';
import {
  MemberInfoProfileImg,
  LeaderPosition,
  MemberInfoProfile,
  MemberInfoProfileInfo,
  MemberInfoProfileName,
  MemberCancel,
} from './style';
import cancel from '../../../src/assets/icon/Icon_cancel.png';
import { authService } from '../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { confirmAlert } from 'react-confirm-alert';
import MemberCancelConfirmUI from './MemberCancelConfirmUI';

const SideMemberList = ({ item }) => {
  // 멤버 리스트
  const memberList = item.teamMember;

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

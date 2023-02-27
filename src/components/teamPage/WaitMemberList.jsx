import { uuidv4 } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import {
  LeaderInfoProfile,
  MemberInfoProfileImgTwo,
  WaitProfileInfo,
  LeaderName,
  WaitChangeIcon,
  YellowBox,
  MemberInfoProfile,
  MemberInfoProfileName,
  MemberInfoProfileNameTwo,
} from './style';
import { confirmAlert } from 'react-confirm-alert';
import CustomConfirmUI from './CustomConfirmUI';
import { authService } from '../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const WaitMemberList = ({ item }) => {
  const memberList = item.teamMember;

  const isWaitChange = (data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomConfirmUI
            onClose={onClose}
            data={data}
            id={item.id}
            item={item.teamMember}
          />
        );
      },
    });
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
      }
    });
  }, []);

  // 멤버 리스트
  return (
    <LeaderInfoProfile>
      {memberList
        .filter((data) => data.isWait === true)
        .map((data) => {
          return (
            <YellowBox key={uuidv4()}>
              <MemberInfoProfile>
                <MemberInfoProfileImgTwo
                  src={
                    data.profileImg
                      ? data.profileImg
                      : 'https://imhannah.me/common/img/default_profile.png'
                  }
                />
                <WaitProfileInfo>
                  <MemberInfoProfileNameTwo>
                    {data.nickName ?? '익명'}
                  </MemberInfoProfileNameTwo>
                  {onlyLeaderLook ? (
                    <WaitChangeIcon onClick={() => isWaitChange(data)} />
                  ) : (
                    ''
                  )}
                </WaitProfileInfo>
              </MemberInfoProfile>
            </YellowBox>
          );
        })}
    </LeaderInfoProfile>
  );
};

export default WaitMemberList;

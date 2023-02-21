import { uuidv4 } from '@firebase/util';
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import {
  LeaderInfoProfile,
  LeaderBox,
  LeaderImgBox,
  MemberInfoProfileImg,
  WaitProfileInfo,
  LeaderName,
  LeaderPosition,
  WaitChangeIcon,
} from './style';
import { confirmAlert } from 'react-confirm-alert';
import CustomConfirmUI from './CustomConfirmUI';

const WaitMemberList = ({ item }) => {
  const memberList = item.teamMember;

  const isWaitChange = (data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return <CustomConfirmUI onClose={onClose} data={data} id={item.id} />;
      },
    });
  };

  // 멤버 리스트
  return (
    <LeaderInfoProfile>
      {memberList
        .filter((data) => data.isWait === true)
        .map((data) => {
          return (
            <LeaderBox key={uuidv4()}>
              <LeaderImgBox>
                <MemberInfoProfileImg
                  src={
                    data.profileImg
                      ? data.profileImg
                      : 'https://imhannah.me/common/img/default_profile.png'
                  }
                />
              </LeaderImgBox>

              <WaitProfileInfo>
                <div>
                  <LeaderName>{data.nickName}</LeaderName>
                  <LeaderPosition>{data.teamPositon}</LeaderPosition>
                </div>
                <WaitChangeIcon onClick={() => isWaitChange(data)}>
                  <HiChevronRight />
                </WaitChangeIcon>
              </WaitProfileInfo>
            </LeaderBox>
          );
        })}
    </LeaderInfoProfile>
  );
};

export default WaitMemberList;

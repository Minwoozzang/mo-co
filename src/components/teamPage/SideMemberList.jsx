import { uuidv4 } from '@firebase/util';
import React from 'react';
import {
  LeaderInfoProfile,
  LeaderBox,
  LeaderImgBox,
  MemberInfoProfileImg,
  LeaderProfileInfo,
  LeaderName,
  LeaderPosition,
} from './style';

const SideMemberList = ({ item }) => {
  // 멤버 리스트
  const memberList = item.teamMember;
  return (
    <LeaderInfoProfile>
      {memberList
        .filter((data) => data.isWait === false)
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

              <LeaderProfileInfo>
                <LeaderName>{data.nickName}</LeaderName>
                <LeaderPosition>{data.teamPosition}</LeaderPosition>
              </LeaderProfileInfo>
            </LeaderBox>
          );
        })}
    </LeaderInfoProfile>
  );
};

export default SideMemberList;

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
  console.log('itme', item);
  return (
    <LeaderInfoProfile>
      <LeaderBox>
        <LeaderImgBox>
          <MemberInfoProfileImg
            src={
              item.profileImg
                ? item.profileImg
                : 'https://imhannah.me/common/img/default_profile.png'
            }
          />
        </LeaderImgBox>

        <LeaderProfileInfo>
          <LeaderName>{item.nickName}</LeaderName>
          <LeaderPosition>{item.teamPosition}</LeaderPosition>
        </LeaderProfileInfo>
      </LeaderBox>
    </LeaderInfoProfile>
  );
};

export default SideMemberList;

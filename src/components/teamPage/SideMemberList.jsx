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
  MemberInfoProfile,
  MemberInfoProfileInfo,
  MemberInfoProfileName,
} from './style';

const SideMemberList = ({ item }) => {
  // 멤버 리스트
  const memberList = item.teamMember;
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
            </MemberInfoProfile>
          );
        })}
    </>
  );
};

export default SideMemberList;

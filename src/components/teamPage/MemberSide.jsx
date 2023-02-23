import React from 'react';
import {
  MemberSidebar,
  SideWrapper,
  MemberInfoProfile,
  MemberInfoProfileImg,
  MemberInfoProfileInfo,
  MemberInfoProfileTitle,
  MemberInfoProfileName,
  MembersInfoProfileTitle,
  LeaderPosition,
  WaitMember,
  WaitMemberTitle,
  WaitMemberListBox,
  WrapWrap,
  SectionLine,
  SideWrapperTwo,
  SideWrapperThr,
} from './style';
import { useEffect, useState } from 'react';
import { authService, db } from '../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { v4 } from 'uuid';
import SideMemberList from './SideMemberList';
import WaitMemberList from './WaitMemberList';
import { RiVipCrownFill } from 'react-icons/ri';

export default function MemberSide({ teamLocationID }) {
  const [nickName, setNickName] = useState('');
  const [profileImg, setProfileImg] = useState('');

  // 팀 리더 정보
  const [teamLeaderInfo, setTeamLeaderInfo] = useState([]);

  // 팀 멤버 정보
  const [teamMemberInfo, setTeamMemberInfo] = useState([]);

  // 이미지 정보 가져오기
  const [teamProfileUserInfo, setTeamProfileUserInfo] = useState([]);

  // 멤버 숫자
  const [memberNumber, setMemberNumber] = useState(1);

  // 내 유저 정보 가져오기
  const teamGetMyUserInfo = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamProfileUserInfo(newInfo);
    });
    return unsubscribe;
  };

  // 팀 유저 정보 가져오기
  const teamGetTeamUserInfo = () => {
    const q = query(collection(db, 'teamPage'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamLeaderInfo(newInfo);
      setTeamMemberInfo(newInfo);
      setMemberNumber(
        newInfo.filter((d) => d.teamID === teamLocationID)[0]?.teamMember
          .length + 1,
      );
    });
    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setNickName(authService.currentUser.displayName);
        setProfileImg(authService.currentUser.photoURL);
        teamGetMyUserInfo();
        teamGetTeamUserInfo();
      } else if (!user) {
        return;
      }
    });
  }, [nickName, profileImg]);

  return (
    <>
      <MemberSidebar>
        <WrapWrap>
          <SideWrapper>
            <MemberInfoProfileTitle>프로필</MemberInfoProfileTitle>
            {teamLeaderInfo
              .filter((item) => item.id === teamLocationID)
              .map((item) => {
                return (
                  <MemberInfoProfile>
                    <MemberInfoProfileImg
                      src={
                        item.teamLeader?.profileImg
                          ? item.teamLeader.profileImg
                          : 'https://imhannah.me/common/img/default_profile.png'
                      }
                    />
                    <MemberInfoProfileInfo>
                      <MemberInfoProfileName>
                        {item.teamLeader.nickName ?? '익명'}
                      </MemberInfoProfileName>
                      <LeaderPosition>
                        {item.teamLeader.teamPosition}
                      </LeaderPosition>
                    </MemberInfoProfileInfo>
                  </MemberInfoProfile>
                );
              })}
          </SideWrapper>
          <SectionLine />
          <SideWrapperTwo>
            <MembersInfoProfileTitle>
              팀원 ({memberNumber})
            </MembersInfoProfileTitle>
            {/* 팅장 */}
            {teamLeaderInfo
              .filter((item) => item.id === teamLocationID)
              .map((item) => {
                return (
                  <MemberInfoProfile key={v4()}>
                    <MemberInfoProfileImg
                      src={
                        item.teamLeader?.profileImg
                          ? item.teamLeader.profileImg
                          : 'https://imhannah.me/common/img/default_profile.png'
                      }
                    />
                    <MemberInfoProfileInfo>
                      <MemberInfoProfileName>
                        {item.teamLeader.nickName ?? '익명'}
                      </MemberInfoProfileName>
                      <LeaderPosition>
                        {item.teamLeader.teamPosition}
                      </LeaderPosition>
                    </MemberInfoProfileInfo>
                  </MemberInfoProfile>
                );
              })}
            {teamMemberInfo
              .filter((item) => item.id === teamLocationID)
              .map((item) => {
                return <SideMemberList item={item} key={v4()} />;
              })}
          </SideWrapperTwo>
          <SideWrapperThr>
            <WaitMember>
              <WaitMemberTitle>참여 신청</WaitMemberTitle>
              <WaitMemberListBox>
                {teamMemberInfo
                  .filter((item) => item.id === teamLocationID)
                  .map((item) => {
                    return <WaitMemberList item={item} key={v4()} />;
                  })}
              </WaitMemberListBox>
            </WaitMember>
          </SideWrapperThr>
        </WrapWrap>
      </MemberSidebar>
    </>
  );
}

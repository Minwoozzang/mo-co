import React from 'react';
import {
  MemberSidebar,
  MemberInfoTitle,
  SideWrapper,
  MemberInfoProfile,
  MemberInfoProfileImg,
  MemberInfoProfileInfo,
  MemberInfoProfileTitle,
  MemberInfoProfileName,
  MemberInfoProfilePosition,
  MembersInfoProfileTitle,
  LeaderInfoProfile,
  HostBox,
  MemberInfoHost,
  LeaderBox,
  LeaderImgBox,
  LeaderProfileInfo,
  LeaderName,
  LeaderPosition,
  MemberList,
} from './style';
import { useEffect, useState } from 'react';
import { authService, db } from '../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { v4 } from 'uuid';
import SideMemberList from './SideMemberList';

export default function MemberSide() {
  const [nickName, setNickName] = useState('');
  const [profileImg, setProfileImg] = useState('');

  // 팀 리더 정보
  const [teamLeaderInfo, setTeamLeaderInfo] = useState([]);

  // 팀 멤버 정보
  const [teamMemberInfo, setTeamMemberInfo] = useState([]);

  // 이미지 정보 가져오기
  const [teamProfileUserInfo, setTeamProfileUserInfo] = useState([]);

  // 멤버 숫자
  const [meberNumber, setMeberNumber] = useState(1);

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
      setTeamMemberInfo(newInfo[0]?.teamMember);
      console.log('t info', teamMemberInfo);
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
        <MemberInfoTitle>멤버 정보 👀</MemberInfoTitle>
        <SideWrapper>
          <MemberInfoProfileTitle>프로필</MemberInfoProfileTitle>
          <MemberInfoProfile>
            <MemberInfoProfileImg
              src={
                teamProfileUserInfo[0]?.profileImg
                  ? teamProfileUserInfo[0].profileImg
                  : 'https://imhannah.me/common/img/default_profile.png'
              }
            />
            <MemberInfoProfileInfo>
              <MemberInfoProfileName>
                {nickName ?? '익명'}
              </MemberInfoProfileName>
            </MemberInfoProfileInfo>
          </MemberInfoProfile>
        </SideWrapper>
        <MembersInfoProfileTitle>팀원 ({meberNumber})</MembersInfoProfileTitle>

        {/* 팅장 */}
        {teamLeaderInfo
          .filter((item) => item.id === '8ba44f94-b64f-44a9-bfb6-821e2effa58d')
          .map((item) => {
            return (
              <LeaderInfoProfile key={item.id}>
                <HostBox>
                  <MemberInfoHost src={item.teamLeader.host} />
                </HostBox>

                <LeaderBox>
                  <LeaderImgBox>
                    <MemberInfoProfileImg
                      src={
                        item.teamLeader?.profileImg
                          ? item.teamLeader.profileImg
                          : 'https://imhannah.me/common/img/default_profile.png'
                      }
                    />
                  </LeaderImgBox>

                  <LeaderProfileInfo>
                    <LeaderName>{item.teamLeader.nickName}</LeaderName>
                    <LeaderPosition>
                      {item.teamLeader.teamPosition}
                    </LeaderPosition>
                  </LeaderProfileInfo>
                </LeaderBox>
              </LeaderInfoProfile>
            );
          })}

        {teamMemberInfo
          // .filter((item) => item.id === '90df7a26-6299-45a8-b4dc-cca494b0a8c5')
          .map((item) => {
            return <SideMemberList item={item} key={v4()} />;
          })}
      </MemberSidebar>
    </>
  );
}

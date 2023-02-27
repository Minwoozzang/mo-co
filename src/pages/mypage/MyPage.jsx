import React from 'react';
import MyPageBookmark from '../../components/mypage/mypageBookmark/MyPageBookmark';
import MyPageComment from '../../components/mypage/mypageComment/MyPageComment';
import Profile from '../../components/mypage/profile/Profile';
import {
  MyPageBody,
  MySection,
  MyProfilSectionBox,
  MyInfoSection,
  DummyProfile,
  DummyBookmark,
  DummyBox,
} from './MyPagestyle';

const MyPage = () => {
  return (
    <MyPageBody>
      <DummyBox>
        <DummyProfile></DummyProfile>
        <MySection>
          <MyProfilSectionBox>
            <Profile />
          </MyProfilSectionBox>
          <MyInfoSection>
            <MyPageBookmark />
            <MyPageComment />
          </MyInfoSection>
        </MySection>
        <DummyBookmark></DummyBookmark>
      </DummyBox>
    </MyPageBody>
  );
};

export default MyPage;

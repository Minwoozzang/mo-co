import React from 'react';
import { useRecoilState } from 'recoil';
import MyPageBookmark from '../../components/mypage/mypageBookmark/MyPageBookmark';
import MyPageComment from '../../components/mypage/mypageComment/MyPageComment';
import Profile from '../../components/mypage/profile/Profile';
import headerToggle from '../../recoil/headerToggleState';
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
  const [dropDownClick, setDropDownClick] = useRecoilState(headerToggle);

  return (
    <MyPageBody onClick={() => setDropDownClick(false)}>
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

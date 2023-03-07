import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/header/Header';
import MocoChat from '../components/mocoChat/MocoChatIcon';
import Login from '../pages/joinLogin/Login';
import SignUp from '../pages/joinLogin/SignUp';
import MateEdit from '../pages/mate/MateEdit';
import MateList from '../pages/mate/MateList';
import MateWrite from '../pages/mate/MateWrite';
import MyPage from '../pages/mypage/MyPage';
import OnboardingPage from '../pages/onboarding/OnboardingPage';
import Search from '../pages/search/Search';
import TeamList from '../pages/teampage/TeamList';

import TeamPage from '../pages/teampage/TeamPage';
import Home from './../pages/home/Home';
import MateDetail from './../pages/mate/MateDetail';
// * 테스트 페이지
import Test from '../pages/Test';
import Amplitude from './../amplitude';
import { authService } from '../common/firebase';
import { useRecoilValue } from 'recoil';
import ScrollTop from '../common/scrollTop';
import authState from '../recoil/authState';

const Router = () => {
  const user = useRecoilValue(authState);
  // path 이름은 보통 소문자로 하니, 저희도 소문자로 통일하겠습니다
  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/matedetail/:id" element={<MateDetail />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/teampage/:id" element={<TeamPage />} />
        <Route path="/mate" element={<MateList />} />
        <Route path="/write" element={<MateWrite />} />
        <Route path="/edit/:id" element={<MateEdit />} />
        <Route path="/search/:word" element={<Search />} />
        <Route path="/teamlist/:nickname" element={<TeamList />} />
        {/* 테스트페이지 */}
        <Route path="/test" element={<Test />} />
        <Route path="/amplitude" element={<Amplitude />} />
      </Routes>
      {user?.uid === null ? null : <MocoChat />}
    </BrowserRouter>
  );
};

export default Router;

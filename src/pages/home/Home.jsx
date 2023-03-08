import styled from '@emotion/styled';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import main_background2 from '../../assets/background/main_background2.png';
import { authService } from '../../common/firebase';
import AddInfoModal from '../../components/home/addInfoModal/AddInfoModal';
import HomeAllBtn from '../../components/home/HomeAllBtn';
import HomeBanner from '../../components/home/HomeBanner';
import HomeGuideText from '../../components/home/HomeGuideText';
import CustomMeeting from '../../components/home/meeting/CustomMeeting';
import HomeMeetingList from '../../components/home/meeting/HomeMeetingList';
import HomeNewMeetingList from '../../components/home/meeting/newmeeting/HomeNewMeetingList';
import useUserQuery from '../../hooks/useUserQuery';

const Home = () => {
  const [init, setInit] = useState(false);
  // 처음에는 false이고 나중에 사용자 존재 판명이 모두 끝났을 때 true를 통해 해당 화면을 render
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const currentUser = authService.currentUser;
  //* 모달 오픈 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  //* 신규 유저 여부 상태
  const [isClosed, SetIsClosed] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // user 판명을 듣고
      if (user) {
        // 있으면
        setIsLoggedIn(true); // 로그인 됨
      } else {
        setIsLoggedIn(false); // 로그인 안됨
      }
      setInit(true); // user 판명 끝
    });
  }, []);

  // 추가 정보 등록 모달 핸들러
  const handleModalOpen = () => {
    if (
      currentUser &&
      localStorage.getItem(`${currentUser.uid}`) !== 'true' &&
      !isClosed
    ) {
      setIsModalOpen(true);
      SetIsClosed(true);
    } else if (
      localStorage.getItem(`${currentUser.uid}`) === 'true' &&
      currentUser &&
      isClosed === false
    ) {
      return;
    }
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    localStorage.setItem(`${currentUser.uid}`, true);
    setIsModalOpen(false);
  };

  // 유저 데이터
  const currentUserData = useUserQuery();
  
  return (
    <FullScreen>
      <HomeBanner />
      <MainBackground>
        {init ? (
          <>
            <CustomListContainer>
            <HomeGuideText 
              isLoggedIn={isLoggedIn} 
              currentUser={currentUser} 
            />
            <CustomMeeting 
              isLoggedIn={isLoggedIn} 
              currentUserData={currentUserData} 
            />
            </CustomListContainer>
            <HomeMeetingList
              isLoggedIn={isLoggedIn}
              currentUserData={currentUserData}
            />
          </>
        ) : (
          <>...</>
        )}
          <HomeNewMeetingList />
          <HomeAllBtn />
      </MainBackground>
      <AddInfoModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    </FullScreen>
  );
};

export default Home;

const FullScreen = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100vh;
  background-size: cover;
  background-color: #111111;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;
const MainBackground = styled.div`
  width: 100%;
  /* height: 100%; */
  background: url(${main_background2});
  background-size: cover;

  background-position: center;
  /* background-color: white; */
`;
const CustomListContainer = styled.div`
  width: 100%;
  height: 585px;
`;
const CoverBackground = styled.div`
  width: 100%;
  /* background-color: #111111; */
`;
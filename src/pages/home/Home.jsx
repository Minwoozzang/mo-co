import { useEffect, useState } from 'react';
import HomeAllBtn from '../../components/home/HomeAllBtn';
import HomeGuideText from '../../components/home/HomeGuideText';
import HomeBanner from '../../components/home/HomeBanner';
import HomeMeetingList from '../../components/home/meeting/HomeMeetingList';
import HomeNewMeetingList from '../../components/home/meeting/newmeeting/HomeNewMeetingList';
import { authService, db } from '../../common/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import MocoChat from '../../components/mocoChat/MocoChatIcon';
import { Modal } from 'antd';
import AddInfoModal from '../../components/home/AddInfoModal';
import { useNavigate } from 'react-router-dom';
import usePosts from '../../hooks/usePost';
import styled from '@emotion/styled';
import main_background from '../../assets/background/main_background.png';
import CardSection from '../../shared/CardSection';
import CustomMeeting from '../../components/home/meeting/CustomMeeting';

const Home = () => {
  const [init, setInit] = useState(false);
  // 처음에는 false이고 나중에 사용자 존재 판명이 모두 끝났을 때 true를 통해 해당 화면을 render
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState('');
  const [userBookmark, setUserBookmark] = useState([]);

  // 내 정보 가져오기
  const getUserBookmark = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserBookmark(newInfo[0]?.bookmarks);
    });

    return unsubscribe;
  };

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
      const uid = user.uid;
      setUid(uid);
      getUserBookmark();
    });
  }, []);

  const { data, isLoading, isError, error } = usePosts();
  const navigate = useNavigate();
  const currentUser = authService.currentUser;
  //* 모달 오픈 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  //* 신규 유저 여부 상태
  const [isClosed, SetIsClosed] = useState(false);
  //* 유저 콜렉션 데이터
  const [userList, setUserList] = useState([]);

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

  // 사용자 맞춤 리스트
  const currentUserData = userList.filter(
    (item) => item.uid === currentUser?.uid,
  );

  const recommendTechList = data
    ? data.filter(
        (item) =>
          !item.isDeleted &&
          item.partyStack.includes(
            currentUserData[0]?.moreInfo?.u_stack.toString(),
          ),
      )
    : [];

  const recommendTimeList = data
    ? data.filter(
        (item) =>
          !item.isDeleted &&
          item.partyTime.includes(currentUserData[0]?.moreInfo?.u_time),
      )
    : [];

  const recommendLocationList = data
    ? data.filter(
        (item) =>
          !item.isDeleted &&
          item.partyLocation.includes(currentUserData[0]?.moreInfo?.u_location),
      )
    : [];

  // 유저 추가 정보를 포함하는 데이터
  const customList = data
    ? data.filter(
        (item) =>
          !item.isDeleted &&
          item.partyStack.includes(
            currentUserData[0]?.moreInfo?.u_stack.toString(),
          ) &&
          item.partyTime.includes(currentUserData[0]?.moreInfo?.u_time) &&
          item.partyLocation.includes(currentUserData[0]?.moreInfo?.u_location),
      )
    : [];
  
  //postList -> 로그인 안 됐을 시 안보이게
  useEffect(() => {
    const userCollectionRef = collection(db, 'user');
    const q = query(userCollectionRef);
    const getUser = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserList(userData);
    });
    if (currentUser) {
      handleModalOpen();
    }
    return getUser;
  }, []);

  return (
    <FullScreen>
      <MocoChat />
      <HomeBanner />
      <MainBackground>
        {init ? (
          <>
            <HomeGuideText isLoggedIn={isLoggedIn} currentUser={currentUser} />
            <CustomMeeting
              isLoggedIn={isLoggedIn}
              customList={customList}
              uid={uid}
              userBookmark={userBookmark}
            />
            <HomeMeetingList
              isLoggedIn={isLoggedIn}
              recommendTechList={recommendTechList}
              recommendTimeList={recommendTimeList}
              recommendLocationList={recommendLocationList}
              uid={uid}
              userBookmark={userBookmark}
            />
          </>
        ) : (
          <>...</>
        )}
        <CoverBackground>
          <HomeNewMeetingList
            data={data}
            uid={uid}
            userBookmark={userBookmark}
          />
          <HomeAllBtn />
        </CoverBackground>
      </MainBackground>
      {/* 신규 유저면 모달 오픈 */}
      <Modal open={isModalOpen} centered={true} closable={false} footer={false}>
        <AddInfoModal
          currentUser={currentUser}
          handleModalClose={handleModalClose}
        />
      </Modal>
    </FullScreen>
  );
};

export default Home;

const FullScreen = styled.div`
  width: 100%;
  /* height: 100%; */
  background-size: cover;
  background-color: #111111;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainBackground = styled.div`
  width: 100%;
  height: 100%;
  background: url(${main_background});
  background-size: cover;
  /* background-color: white; */
`;
const CoverBackground = styled.div`
  width: 100%;
  background-color: #111111;
`;

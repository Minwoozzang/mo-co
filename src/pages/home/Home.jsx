import { useEffect, useState } from 'react';
import HomeAllBtn from '../../components/home/HomeAllBtn';
import HomeGuideText from '../../components/home/HomeGuideText';
import HomeBanner from '../../components/home/HomeBanner';
import HomeMeetingList from '../../components/home/meeting/HomeMeetingList';
import HomeNewMeetingList from '../../components/home/meeting/newmeeting/HomeNewMeetingList';
import { useQueries } from 'react-query';
import { authService, db } from '../../common/firebase';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import MocoChat from '../../components/mocoChat/MocoChatIcon';
import { Modal } from 'antd';
import AddInfoModal from '../../components/home/AddInfoModal';
import { useNavigate } from 'react-router-dom';
import usePosts from '../../hooks/usePost';

const Home = () => {
  const { data, isLoading, isError, error } = usePosts();
  console.log('🚀 ~ file: Home.jsx:24 ~ Home ~ data:', data);

  const navigate = useNavigate();
  const currentUser = authService.currentUser;
  console.log('🚀 ~ file: Home.jsx:24 ~ Home ~ currentUser:', currentUser);
  const creationTime = currentUser?.metadata.creationTime;
  const lastSignInTime = currentUser?.metadata.lastSignInTime;

  //* 모달 오픈 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  //* 신규 유저 여부 상태
  const [isClosed, SetIsClosed] = useState(false);
  // const [postList, setPostList] = useState([]);
  const [userList, setUserList] = useState([]);

  // ! 추가 정보 등록 모달 핸들러
  const handleModalOpen = () => {
    if (creationTime === lastSignInTime && currentUser && isClosed === false) {
      setIsModalOpen(true);
      SetIsClosed(true);
    }
  };

  // ! 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
  // const recommendTechList = data.filter(
  //   (item) =>
  //     !item.isDeleted &&
  //     item.partyStack.includes(
  //       currentUserData[0]?.moreInfo?.u_stack.toString(),
  //     ),
  // );
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

  // useEffect(() => {
  //   const postCollectionRef = collection(db, 'post');
  //   const q = query(postCollectionRef, orderBy('createdAt', 'desc'));
  //   const getPost = onSnapshot(q, (snapshot) => {
  //     const postData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setPostList(postData);
  //   });
  //   return getPost;
  // }, []);

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
    handleModalOpen();
    return getUser;
  }, []);

  return (
    <>
      <MocoChat />
      <HomeBanner />
      <HomeGuideText currentUser={currentUser} />
      <HomeMeetingList
        recommendTechList={recommendTechList}
        recommendTimeList={recommendTimeList}
        recommendLocationList={recommendLocationList}
      />
      <HomeNewMeetingList data={data} />
      <HomeAllBtn />
      {/* 신규 유저면 모달 오픈 */}
      <Modal open={isModalOpen} centered={true} closable={false} footer={false}>
        <AddInfoModal handleModalClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default Home;

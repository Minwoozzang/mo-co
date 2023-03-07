import { useEffect, useState } from 'react';
import { authService, db } from '../../../common/firebase';
import NotiMessage from './NotiMessage';
import styled from '@emotion/styled';
import LeaderGotMessage from './LeaderGotMessage';
import NotiCategoryList from './NotiCategoryList';
import { useRecoilValue } from 'recoil';
import testteamPageState from '../../../recoil/testteamPageState';

const NotiBadge = () => {
  // const [teamPage, setTeamPage] = useState([]);
  const teamPage = useRecoilValue(testteamPageState);
  console.log(teamPage)

  // 팀페이지 팀멤버에서 isRead가 false인 데이터
  
  // 팀페이지 팀멤버에서 유저가 포함된 팀페이지 데이터
  let myAppliedMeeting = [];
  const myApplyMeeting = teamPage.forEach((item) => {
    item.teamMember.forEach((member) => {
      if (member.uid === authService?.currentUser?.uid) {
        myAppliedMeeting.push(item);
        return false;
      }
    });
  });
  console.log('참여된 모임 데이터', myAppliedMeeting);

  // teamPage.teamLeader에서 currentUser가 포함된 teamPage 데이터
  const teamLeaderList = teamPage.filter((item) =>
    item.teamLeader?.uid?.includes(authService?.currentUser?.uid),
  );
  console.log('팀리더 데이터', teamLeaderList);

  // 카테고리 클릭 시
  const [myNoti, setMyNoti] = useState(false);

  const [category, setCategory] = useState([
    { isClicked: true, name: '모임 수락 알림' },
    { isClicked: false, name: '모임 신청 알림' },
  ]);
  const isClickedMeeting = () => {
    if (myNoti === true) {
      const clickedCategory = category.map((obj) => {
        return { ...obj, isClicked: !obj.isClicked };
      });
      setMyNoti(false);
      setCategory(clickedCategory);
    }
    if (myNoti === false) {
      const clickedCategory = category.map((obj) => {
        return { ...obj, isClicked: !obj.isClicked };
      });
      setMyNoti(true);
      setCategory(clickedCategory);
    }
  };

  // teamPage 데이터
  // useEffect(() => {
  //   const teamPageCollectionRef = collection(db, 'teamPage');
  //   const q = query(teamPageCollectionRef);
  //   const getTeamPage = onSnapshot(q, (snapshot) => {
  //     const teamPageData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setTeamPage(teamPageData);
  //   });
  //   return getTeamPage;
  // }, []);
  // console.log(teamPage);

  return (
    <Container>
      <NotiCategory>
        {category.map((item, idx) => (
          <NotiCategoryList
            key={idx}
            item={item}
            isClickedMeeting={isClickedMeeting}
          />
        ))}
      </NotiCategory>

      {myNoti ? (
        <Box2>
          {teamLeaderList.map((item, idx) => (
            <LeaderGotMessage 
              key={idx} item={item}
            />
          ))}
        </Box2>
      ) : (
        <Box1>
          {myAppliedMeeting.map((item, idx) => (
            <NotiMessage 
              key={idx} item={item}
            />
          ))}
        </Box1>
      )}
    </Container>
  );
};

export default NotiBadge;

const Container = styled.div``;
const NotiCategory = styled.div`
  height: 1rem;
  display: flex;
  gap: 0 20px;
  margin-bottom: 30px;
`;
const Box1 = styled.div`
  /* border-bottom: 0.1px solid gray; */
`;
const Box2 = styled.div`
  /* border-bottom: 0.1px solid gray; */
`;

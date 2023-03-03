import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { authService, db } from '../../../common/firebase';
import NotiMessage from './NotiMessage';
import styled from '@emotion/styled';

const NotiBadge = () => {
  const [teamPage, setTeamPage] = useState([]);

  // 필요한 데이터 : 팀페이지, 유저 불러와서 push /teamID

  let myAppliedMeeting = [];
  const myApplyMeeting = teamPage.forEach((item) => {
    item.teamMember.forEach((member) => {
      if (member.uid === authService?.currentUser?.uid) {
        myAppliedMeeting.push(item);
        return false;
      }
    });
  });
  console.log(myAppliedMeeting);

  const teamLeaderList = teamPage.filter((item) =>
    item.teamLeader?.uid?.includes(authService?.currentUser?.uid),
  );
  console.log('팀리더 데이터', teamLeaderList);

  // teamPage 데이터
  useEffect(() => {
    const teamPageCollectionRef = collection(db, 'teamPage');
    const q = query(teamPageCollectionRef);
    const getTeamPage = onSnapshot(q, (snapshot) => {
      const teamPageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamPage(teamPageData);
    });
    return getTeamPage;
  }, []);
  console.log(teamPage);

  return (
    <Container>
      <Box1>
        {myAppliedMeeting.map((item, idx) => (
          <NotiMessage key={idx} item={item} />
        ))}
      </Box1>
      <Box2>
        {teamLeaderList.map((item, idx) => (
          <div key={idx}>
            리더{idx+1} : {item.teamMember.length > 0 
            ? '알림있음' : ''
            }
          </div>
        ))}
      </Box2>
    </Container>
  );
};

export default NotiBadge;

const Container = styled.div``;
const Box1 = styled.div`
  margin-bottom: 30px;
`;
const Box2 = styled.div``;

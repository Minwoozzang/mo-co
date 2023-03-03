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

  // let testArr = [];
  // const testdata = myAppliedMeeting[0]?.teamMember.forEach((item) => {
  //   if (item.nickName === authService?.currentUser?.displayName) {
  //     testArr.push(item);
  //     return false;
  //   }
  // });
  // console.log(testArr);

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
      {/* {testArr[0]?.isWait ? '' : <div>참여신청이 수락되었습니다.</div>} */}
      {myAppliedMeeting.map((item, idx) => (
        <NotiMessage 
          key={idx}
          item={item}
        />
      ))}
    </Container>
  );
};

export default NotiBadge;

const Container = styled.div`
  /* width: 500px; */
`

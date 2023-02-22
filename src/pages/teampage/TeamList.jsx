import styled from '@emotion/styled';
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { authService, db } from '../../common/firebase';
import OngoingCardSection from '../../components/teamList/OngoingCardSection';
import TeamListCategory from '../../components/teamList/TeamListCategory';
import CardSection from '../../shared/CardSection';

const TeamList = () => {
  const params = useParams();
  
  const [postList, setPostList] = useState([]);
  const [teamPage, setTeamPage] = useState([]);
  
  // teamPage teamMember에서 내 닉네임이 포함된 teamPage 데이터
  let myAppliedMeeting = [];
  const myApplyMeeting = teamPage.forEach((item) =>{
    item.teamMember.forEach(member => {
      if (member.nickName === authService?.currentUser?.displayName){
        myAppliedMeeting.push(item)
        return false;
      } 
    })
  }
  );

  // 참여 신청 수락 후 데이터(진행 중 모임)
  const approvedMeeting = myAppliedMeeting?.filter(
    (item) => item.teamMember[0]?.isWait === false,
  );

  // 자신이 개설한 팀 데이터(리더)
  const myOnGoingMeeting = teamPage?.filter((item) =>
    item.teamLeader?.nickName?.includes(authService?.currentUser?.displayName),
  );

  // 진행 중 모임
  const onGoingMeeting = approvedMeeting?.concat(myOnGoingMeeting); //리더 표시해주기

  // 참여 신청 데이터 -> postList에서 불러와야 됨
  // 내 닉네임이 포함된 데이터에서 teamID만 추출
  const myAppliedteamID = myAppliedMeeting?.map((item) => item.teamID);
  console.log('myAppliedteamID', myAppliedteamID?.toString());

  // myAppliedteamID가 각각 들어있는 postList 추출
  const appliedMeeting = postList?.filter((item) =>
    // item.teamID in myAppliedteamID
    myAppliedteamID?.includes(item.teamID),
  );

  // 카테고리 클릭 시
  const [myTeamIsWait, setMyTeamIsWait] = useState(false);
  console.log(myTeamIsWait);

  const [category, setCategory] = useState([
    { isClicked: true, name: '진행 중 모임' },
    { isClicked: false, name: '참여 신청 모임' },
  ]);
  const isClickedMeeting = () => {
    if (myTeamIsWait === true) {
      const clickedCategory = category.map((obj) => {
        return { ...obj, isClicked: !obj.isClicked };
      });
      setMyTeamIsWait(false);
      setCategory(clickedCategory);
    }
    if (myTeamIsWait === false) {
      const clickedCategory = category.map((obj) => {
        return { ...obj, isClicked: !obj.isClicked };
      });
      setMyTeamIsWait(true);
      setCategory(clickedCategory);
    }
  };

  console.log('postList', postList);
  console.log('teamPage', teamPage);
  console.log(teamPage[0]?.teamLeader?.isWait);
  console.log(teamPage[0]?.teamID);

  // teamPage/teamID 로 이동
  const navigate = useNavigate();
  const goToTeamPage = (id) => {
    navigate(`/teamPage/${id}`);
  };

  // teamPage로 가는 버튼 팀리스트에서만 보이게하기
  const [show, setShow] = useState(true); 

  //post 데이터 불러오기
  useEffect(() => {
    const postCollectionRef = collection(db, 'post');
    const q = query(postCollectionRef, orderBy('createdAt', 'desc'));
    const getPost = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostList(postData);
    });
    return getPost;
  }, []);

  // teamPage 데이터 불러오기
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
  
  return (
    <TeamListContainer>
      <UserMeetingTitle>{params.nickname}님의 코딩모임</UserMeetingTitle>
      <MeetingCategory>
        {category.map((item, idx) => (
          <TeamListCategory
            key={idx}
            item={item}
            isClickedMeeting={isClickedMeeting}
          />
        ))}
      </MeetingCategory>
      <CardContainer>
        {myTeamIsWait
          ? appliedMeeting?.map((item, idx) => (
              <CardSection key={idx} item={item} />
            ))
          : onGoingMeeting?.map((item, idx) => (
              <OngoingCardSection
                key={idx}
                item={item}
                goToTeamPage={goToTeamPage}
                showTeamPageBtn={show}
              />
            ))}
      </CardContainer>
    </TeamListContainer>
  );
};

export default TeamList;

const TeamListContainer = styled.div`
  width: 1178px;
  margin: 0 auto;
  /* background-color: #d7e5f1; */
`;
const UserMeetingTitle = styled.div`
  /* width: 233px; */
  height: 40px;
  margin-top: 90px;
  font-size: 30px;
  font-weight: 500;
`;
const MeetingCategory = styled.div`
  /* width: 250px; */
  height: 44px;
  display: flex;
  gap: 0 30px;
  margin-top: 50px;
  /* background-color: #83c0f1; */
`;
const CardContainer = styled.div`
  width: 1178px;
  margin-top: 40px;
  display: flex;
  gap: 20px 20px;
  flex-wrap: wrap;
  /* background-color: #c9dff3; */
`;

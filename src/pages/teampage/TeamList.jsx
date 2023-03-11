import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authService, db } from '../../common/firebase';
import OngoingCard from '../../components/teamList/OngoingCard';
import PaginationTeamList from '../../components/pagenation/PaginationTeamList';
import TeamListCategory from '../../components/teamList/TeamListCategory';
import headerToggle from '../../recoil/headerToggleState';
import postState from '../../recoil/postState';
import teamPageState from '../../recoil/teamPageState';
import CardSection from '../../shared/CardSection';
import { useMediaQuery } from 'react-responsive';
import OnGoingCardBox from '../../components/teamList/media/OnGoingCardBox';
import OnGoingTabletCardBox from '../../components/teamList/media/OnGoinTabletCardBox';
import OnGoingMobileCardBox from '../../components/teamList/media/OnGoingMobileCardBox';
import AppliedCardBox from '../../components/teamList/media/AppliedCardBox';
import AppliedLaptopCardBox from '../../components/teamList/media/AppliedLaptopCardBox';
import AppliedTabletCardBox from '../../components/teamList/media/AppliedTabletCardBox';
import AppliedMobileCardBox from '../../components/teamList/media/AppliedMobileCardBox';

const TeamList = () => {
  const params = useParams();

  // Ongoing
  const isOnGoingFullScreen = useMediaQuery({
    query: `(min-width: 1468px)`,
  });
  const isOnGoingTabletScreen = useMediaQuery({
    query: `(min-width: 974px) and (max-width: 1468px)`,
  });
  const isOnGoingMobileScreen = useMediaQuery({
    query: `(max-width: 974px)`,
  });

  const [onGoingminValue, setOnGoingMinValue] = useState(0);
  const [onGoingmaxValue, setOnGoingMaxValue] = useState(6);

  const [onGoingTabletminValue, setOnGoingTabletMinValue] = useState(0);
  const [onGoingTabletmaxValue, setOnGoingTabletMaxValue] = useState(4);

  const [onGoingMobileminValue, setOnGoingMobileMinValue] = useState(0);
  const [onGoingMobilemaxValue, setOnGoingMobileMaxValue] = useState(2);

  const onGoinghandleChange = (page) => { // 페이지네이션 핸들러
    setOnGoingMinValue(page * 6 - 6);
    setOnGoingMaxValue(page * 6);
  };
  const onGoingTablethandleChange = (page) => {
    setOnGoingTabletMinValue(page * 4 - 4);
    setOnGoingTabletMaxValue(page * 4);
  };
  const onGoingMobilehandleChange = (page) => {
    setOnGoingMobileMinValue(page * 2 - 2);
    setOnGoingMobileMaxValue(page * 2);
  };

  // Applied
  const isAppliedFullScreen = useMediaQuery({
    query: `(min-width: 1470px)`,
  });
  const isAppliedLaptopScreen = useMediaQuery({
    query: `(min-width: 1101px) and (max-width: 1470px)`,
  });
  const isAppliedTabletScreen = useMediaQuery({
    query: `(min-width: 733px) and (max-width: 1101px)`,
  });
  const isAppliedMobileScreen = useMediaQuery({
    query: `(max-width: 733px)`,
  });

  const [appliedminValue, setAppliedMinValue] = useState(0);
  const [appliedmaxValue, setAppliedMaxValue] = useState(4);

  const [appliedLaptopminValue, setAppliedLaptopMinValue] = useState(0);
  const [appliedLaptopmaxValue, setAppliedLaptopMaxValue] = useState(3);

  const [appliedTabletminValue, setAppliedTabletMinValue] = useState(0);
  const [appliedTabletmaxValue, setAppliedTabletMaxValue] = useState(2);

  const [appliedMobileminValue, setAppliedMobileMinValue] = useState(0);
  const [appliedMobilemaxValue, setAppliedMobileMaxValue] = useState(1);

  const appliedhandleChange = (page) => { // 페이지네이션 핸들러
    setAppliedMinValue(page * 4 - 4);
    setAppliedMaxValue(page * 4);
  };
  const appliedLaptophandleChange = (page) => { // 페이지네이션 핸들러
    setAppliedLaptopMinValue(page * 3 - 3);
    setAppliedLaptopMaxValue(page * 3);
  };
  const appliedTablethandleChange = (page) => { // 페이지네이션 핸들러
    setAppliedTabletMinValue(page * 2 - 2);
    setAppliedTabletMaxValue(page * 2);
  };
  const appliedMobilehandleChange = (page) => { // 페이지네이션 핸들러
    setAppliedMobileMinValue(page * 1 - 1);
    setAppliedMobileMaxValue(page * 1);
  };

  // 작성글, 팀페이지 데이터
  const postList = useRecoilValue(postState);
  const teamPage = useRecoilValue(teamPageState);

  // teamPage로 가는 버튼 팀리스트에서만 보이게하기
  const [show, setShow] = useState(true);

  // teamPage teamMember에서 내 닉네임이 포함된 teamPage 데이터
  let myAppliedMeeting = [];
  const myApplyMeeting = teamPage?.forEach((item) => {
    item.isDeleted === false &&
      item.teamMember.forEach((member) => {
        if (member.uid === authService?.currentUser?.uid) {
          myAppliedMeeting.push(item);
          return false;
        }
      });
  });

  // 참여 신청 수락 후 데이터(진행 중 모임), teamMember isWait=false, uid = useruid
  let myApprovedMeeting = [];
  const approvedMeeting = myAppliedMeeting.forEach((item) => {
    item.teamMember.forEach((member) => {
      if (
        member.isWait === false &&
        member.uid === authService?.currentUser?.uid
      ) {
        myApprovedMeeting.push(item);
        return false;
      }
    });
  });

  // 자신이 개설한 팀 데이터(리더)
  const myOnGoingMeeting = teamPage?.filter(
    (item) =>
      item.isDeleted === false &&
      item.teamLeader?.uid?.includes(authService?.currentUser?.uid),
  );

  // 진행 중 모임
  const onGoingMeeting = myApprovedMeeting?.concat(myOnGoingMeeting); //리더 표시해주기

  // 참여 신청 데이터 -> postList에서 불러와야 됨
  // 참여 신청 수락되면 참여 신청 모임 쪽에는 안 보이게(참여신청모임), teamMember isWait=true
  let myApprovedMeetingAfter = [];
  const approvedMeetingAfter = myAppliedMeeting.forEach((item) => {
    item.teamMember.forEach((member) => {
      if (
        member.isWait === true &&
        member.uid === authService?.currentUser?.uid
      ) {
        myApprovedMeetingAfter.push(item);
        return false;
      }
    });
  });

  // 팀 멤버에 내 닉네임이 포함된 데이터에서 teamID만 추출
  const myAppliedteamID = myApprovedMeetingAfter?.map((item) => item.teamID);

  // myAppliedteamID가 각각 들어있는 postList 추출
  const appliedMeeting = postList?.filter(
    (item) =>
      item.isDeleted === false && myAppliedteamID?.includes(item.teamID),
  );

  // 카테고리 클릭 시
  const [myTeamIsWait, setMyTeamIsWait] = useState(false);

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

  // teamPage/teamID 로 이동
  const navigate = useNavigate();
  const goToTeamPage = (id) => {
    navigate(`/teamPage/${id}`, { state: id });
  };

  const [dropDownClick, setDropDownClick] = useRecoilState(headerToggle);

  return (
    <TeamListFullScreen onClick={() => setDropDownClick(false)}>
      <TeamListContainer>
        <GapBox />
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
        {myTeamIsWait === false && isOnGoingFullScreen && (
          <OnGoingCardBox 
            onGoingMeeting={onGoingMeeting}
            goToTeamPage={goToTeamPage}
            show={show}
            handleChange={onGoinghandleChange}
            minValue={onGoingminValue}
            maxValue={onGoingmaxValue}
          />
        )}
        {myTeamIsWait === false && isOnGoingTabletScreen && (
          <OnGoingTabletCardBox 
            onGoingMeeting={onGoingMeeting}
            goToTeamPage={goToTeamPage}
            show={show}
            handleChange={onGoingTablethandleChange}
            minValue={onGoingTabletminValue}
            maxValue={onGoingTabletmaxValue}
          />
        )}
        {myTeamIsWait === false && isOnGoingMobileScreen && (
          <OnGoingMobileCardBox 
            onGoingMeeting={onGoingMeeting}
            goToTeamPage={goToTeamPage}
            show={show}
            handleChange={onGoingMobilehandleChange}
            minValue={onGoingMobileminValue}
            maxValue={onGoingMobilemaxValue}
          />
        )}
        {myTeamIsWait && isAppliedFullScreen && (
          <AppliedCardBox 
            appliedMeeting={appliedMeeting}
            handleChange={appliedhandleChange}
            minValue={appliedminValue}
            maxValue={appliedmaxValue}
          />
        )}
        {myTeamIsWait && isAppliedLaptopScreen && (
          <AppliedLaptopCardBox
            appliedMeeting={appliedMeeting}
            handleChange={appliedLaptophandleChange}
            minValue={appliedLaptopminValue}
            maxValue={appliedLaptopmaxValue}
          />
        )}
        {myTeamIsWait && isAppliedTabletScreen && (
          <AppliedTabletCardBox
            appliedMeeting={appliedMeeting}
            handleChange={appliedTablethandleChange}
            minValue={appliedTabletminValue}
            maxValue={appliedTabletmaxValue}
          />
        )}
        {myTeamIsWait && isAppliedMobileScreen && (
          <AppliedMobileCardBox
            appliedMeeting={appliedMeeting}
            handleChange={appliedMobilehandleChange}
            minValue={appliedMobileminValue}
            maxValue={appliedMobilemaxValue}
          />
        )}
      </TeamListContainer>
    </TeamListFullScreen>
  );
};

export default TeamList;

const TeamListFullScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #111111;
  /* margin-top: 80px; */
`;
const TeamListContainer = styled.div`
  /* width: 73.625rem; */
  /* width: 75rem; */
  width: 62.5%;
  margin: 0 auto;
  /* height: 100vh; */
  /* background-color: #d7e5f1; */
`;
const GapBox = styled.div`
  height: 90px;
  /* background-color: aliceblue; */
`;
const UserMeetingTitle = styled.div`
  /* width: 233px; */
  height: 40px;
  /* margin-top: 90px; */
  font-size: 30px;
  font-weight: 500;
  color: #ffffff;
`;
const MeetingCategory = styled.div`
  /* width: 250px; */
  height: 44px;
  display: flex;
  gap: 0 30px;
  margin-top: 50px;
  /* background-color: #83c0f1; */
`;

const AppliedCardContainer = styled.div`
  /* width: 73.625rem; */
  width: 1180px;
  /* height: 618px; */
  margin-top: 40px;
  display: flex;
  gap: 0 20px;
  flex-wrap: wrap;
  /* height: 1000px; */
  /* background-color: #c9dff3; */
`;
const OnGoingCardContainer = styled.div`
  width: 1178px;
  margin-top: 40px;
  display: flex;
  gap: 20px 20px;
  flex-wrap: wrap;
  /* background-color: #c9dff3; */
`;
const OnGoingMediaCardContainer = styled.div`
  width: 48.625rem;
  margin-top: 40px;
  display: flex;
  gap: 90px 20px;
  flex-wrap: wrap;
  /* background-color: #c9dff3; */
`;

// 페이지네이션
const OnGoingPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 3.125rem;
  /* margin: 3rem; */
  /* margin-top: 110px; */
  padding: 0.625rem;
  margin-top: 20px;
  /* background-color: #111111; */
  /* background-color: aliceblue; */
`;
const AppliedPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 3.125rem;
  /* width: 75rem; */
  width: 100%;
  /* margin: 3rem; */
  /* margin-top: 110px; */
  padding: 0.625rem;
  margin-top: 80px;
  /* background-color: #111111; */
  /* background-color: aliceblue; */
`;

// 모임 목록 없을 때
const NonApplyText = styled.div`
  color: #ffffff;
  height: 44px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
`;

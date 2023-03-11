import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authService, db } from '../../common/firebase';
import OngoingCardSection from '../../components/teamList/OngoingCardSection';
import PaginationTeamList from '../../components/pagenation/PaginationTeamList';
import TeamListCategory from '../../components/teamList/TeamListCategory';
import headerToggle from '../../recoil/headerToggleState';
import postState from '../../recoil/postState';
import teamPageState from '../../recoil/teamPageState';
import CardSection from '../../shared/CardSection';
import { useMediaQuery } from 'react-responsive';

const TeamList = () => {
  const params = useParams();

  const isSmallScreen1 = useMediaQuery({
    query: `(min-width: 1196px)`,
  });
  const isSmallScreen2 = useMediaQuery({
    query: `(min-width: 800px) and (max-width: 1196px)`,
  });

  const maxValueState = isSmallScreen1 ? 6 : isSmallScreen2 ? 4 : 2;

  const [onGoingminValue, setOnGoingMinValue] = useState(0);
  const [onGoingmaxValue, OnGoingsetMaxValue] = useState(3);

  const [appliedminValue, setAppliedMinValue] = useState(0);
  const [appliedmaxValue, setAppliedMaxValue] = useState(4);

  // 반응형
  // const [minValue2, setMinValue2] = useState(0);
  // const [maxValue2, setMaxValue2] = useState(4);

  // 반응형 모바일
  // const [minValue3, setMinValue3] = useState(0);
  // const [maxValue3, setMaxValue3] = useState(2);

  // 페이지네이션 핸들러
  const handleChange1 = (page) => {
    setOnGoingMinValue(page * 3 - 3);
    OnGoingsetMaxValue(page * 3);
  };
  const handleChange2 = (page) => {
    setAppliedMinValue(page * 4 - 4);
    setAppliedMaxValue(page * 4);
  };
  // const handleChange2 = (page) => {
  //   setMinValue2(page * maxValueState - maxValueState);
  //   setMaxValue2(page * maxValueState);
  // };
  // const handleChange3 = (page) => {
  //   setMinValue3(page * maxValueState - maxValueState);
  //   setMaxValue3(page * maxValueState);
  // };

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

        {myTeamIsWait ? (
          <>
            <AppliedCardBox>
              <CardContainer1>
                {appliedMeeting
                  ?.slice(appliedminValue, appliedmaxValue)
                  .map((item, idx) => (
                    <CardSection key={idx} item={item} db={db} />
                  ))}
              </CardContainer1>
            </AppliedCardBox>
            {appliedMeeting?.length === 0 ? (
              <NonApplyText>❌ 신청한 모임이 없습니다 ❌</NonApplyText>
            ) : (
              <AppliedPaginationContainer>
                <PaginationTeamList
                  handleChange={handleChange2}
                  data={appliedMeeting}
                  maxValue={appliedmaxValue}
                />
              </AppliedPaginationContainer>
            )}
          </>
        ) : (
          <>
            <CardContainer2>
              {onGoingMeeting
                ?.slice(onGoingminValue, onGoingmaxValue)
                .map((item, idx) => (
                  <OngoingCardSection
                    key={idx}
                    item={item}
                    goToTeamPage={goToTeamPage}
                    showTeamPageBtn={show}
                  />
                ))}
            </CardContainer2>
            {onGoingMeeting?.length === 0 ? (
              <NonApplyText>❌ 진행 중인 모임이 없습니다 ❌</NonApplyText>
            ) : (
              <PaginationContainer>
                <PaginationTeamList
                  handleChange={handleChange1}
                  data={onGoingMeeting}
                  maxValue={onGoingmaxValue}
                />
              </PaginationContainer>
            )}
          </>
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
const AppliedCardBox = styled.div`
  width: 1180px;
  /* background-color: blue; */
`;
const CardContainer1 = styled.div`
  /* width: 73.625rem; */
  width: 100%;
  margin-top: 40px;
  display: flex;
  gap: 90px 20px;
  flex-wrap: wrap;
  /* height: 1000px; */
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
const CardContainer2 = styled.div`
  width: 1178px;
  margin-top: 40px;
  display: flex;
  gap: 20px 20px;
  flex-wrap: wrap;
  /* background-color: #c9dff3; */
`;

// 페이지네이션
const PaginationContainer = styled.div`
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
  width: 75rem;
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

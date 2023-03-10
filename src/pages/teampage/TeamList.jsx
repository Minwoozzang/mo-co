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

const TeamList = () => {
  const params = useParams();

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(6);

  // 페이지네이션 핸들러
  const handleChange = (page) => {
    setMinValue(page * 6 - 6);
    setMaxValue(page * 6);
  };

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
            <CardContainer1>
              {appliedMeeting?.slice(minValue, maxValue).map((item, idx) => (
                <CardSection key={idx} item={item} db={db} />
              ))}
            </CardContainer1>
            {appliedMeeting?.length === 0 ? (
              ''
            ) : (
              <PaginationContainer>
                <PaginationTeamList
                  handleChange={handleChange}
                  data={appliedMeeting}
                />
              </PaginationContainer>
            )}
          </>
        ) : (
          <>
            <CardContainer2>
              {onGoingMeeting?.slice(minValue, maxValue).map((item, idx) => (
                <OngoingCardSection
                  key={idx}
                  item={item}
                  goToTeamPage={goToTeamPage}
                  showTeamPageBtn={show}
                />
              ))}
            </CardContainer2>
            {onGoingMeeting?.length === 0 ? (
              ''
            ) : (
              <PaginationContainer>
                <PaginationTeamList
                  handleChange={handleChange}
                  data={onGoingMeeting}
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
  width: 1178px;
  margin: 0 auto;
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
const CardContainer1 = styled.div`
  width: 1178px;
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
  height: 100%;
  /* margin: 3rem; */
  /* margin-top: 110px; */
  padding: 6rem;
  background-color: #111111;
`;

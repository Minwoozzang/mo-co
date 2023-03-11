import styled from '@emotion/styled';
import PaginationTeamList from '../../pagenation/PaginationTeamList';
import OngoingCard from '../OngoingCard';

const OnGoingMobileCardBox = ({
  onGoingMeeting,
  goToTeamPage,
  show,
  handleChange,
  minValue,
  maxValue,
}) => {
  return (
    <>
      <OnGoingCardContainer>
        {onGoingMeeting?.slice(minValue, maxValue).map((item, idx) => (
          <OngoingCard
            key={idx}
            item={item}
            goToTeamPage={goToTeamPage}
            showTeamPageBtn={show}
          />
        ))}
      </OnGoingCardContainer>
      {onGoingMeeting?.length === 0 ? (
        <NonApplyText>❌ 신청한 모임이 없습니다 ❌</NonApplyText>
      ) : (
        <OnGoingPaginationContainer>
          <PaginationTeamList
            handleChange={handleChange}
            data={onGoingMeeting}
            maxValue={maxValue}
          />
        </OnGoingPaginationContainer>
      )}
    </>
  );
};

export default OnGoingMobileCardBox;

const OnGoingCardContainer = styled.div`
  width: 379px;
  margin-top: 40px;
  display: flex;
  gap: 20px 0px;
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
// 모임 목록 없을 때
const NonApplyText = styled.div`
  color: #ffffff;
  height: 44px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
`;

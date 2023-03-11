import styled from '@emotion/styled';
import { db } from '../../../common/firebase';
import CardSection from '../../../shared/CardSection';
import PaginationTeamList from '../../pagenation/PaginationTeamList';

const AppliedLaptopCardBox = ({
  appliedMeeting,
  handleChange,
  minValue,
  maxValue,
}) => {
  return (
    <>
      <AppliedCardContainer>
        {appliedMeeting?.slice(minValue, maxValue).map((item, idx) => (
          <CardSection key={idx} item={item} db={db} />
        ))}
      </AppliedCardContainer>
      {appliedMeeting?.length === 0 ? (
        <NonApplyText>❌ 진행 중인 모임이 없습니다 ❌</NonApplyText>
      ) : (
        <AppliedPaginationContainer>
          <PaginationTeamList
            handleChange={handleChange}
            data={appliedMeeting}
            maxValue={maxValue}
          />
        </AppliedPaginationContainer>
      )}
    </>
  );
};

export default AppliedLaptopCardBox;

const AppliedCardContainer = styled.div`
  /* width: 73.625rem; */
  width: 880px;
  /* height: 618px; */
  margin-top: 40px;
  display: flex;
  gap: 0 20px;
  flex-wrap: wrap;
  /* height: 1000px; */
  /* background-color: #c9dff3; */
`;

// 페이지네이션
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

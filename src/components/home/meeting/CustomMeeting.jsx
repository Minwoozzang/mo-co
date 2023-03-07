import styled from '@emotion/styled';
import CardSection from '../../../shared/CardSection';
import CustomBlurList from '../../nonLogin/CustomBlurList';

const CustomMeeting = ({ isLoggedIn, customList }) => {
  return (
    <CustomListContainer>
      <CustomListCardBox>
        {isLoggedIn ? (
          customList.length === 0 ? (
            <NonCustomList>
              모든 조건이 맞는 모임이 아직 없습니다
              <br />
              (기술 스택, 지역, 시간대 종합)
            </NonCustomList>
          ) : (
            customList
              .slice(0, 3)
              .map((item, idx) => <CardSection key={idx} item={item} />)
          )
        ) : (
          <CustomBlurList />
        )}
      </CustomListCardBox>
    </CustomListContainer>
  );
};

export default CustomMeeting;

const CustomListContainer = styled.div`
  width: 1004px;
  height: 320px;
  margin: 50px auto 171px;
  /* border: 0.3px solid gray; */
`;
const CustomListCardBox = styled.div`
  width: 900px;
  height: 320px;
  margin: 0 auto;
  margin-top: 140px;
  display: flex;
  gap: 0 30px;
`;
// customList.length === 0
const NonCustomList = styled.div`
  width: 900px;
  height: 100px;
  margin: 0 auto;
  /* margin-top: 140px; */
  display: flex;
  background-color: #232323;
  border: 1px solid #3b3b3b;
  color: #ffffff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
  box-shadow: 2px 4px 8px #545454;
  line-height: 1.5;
  position: absolute;
  top: 60%;
`;

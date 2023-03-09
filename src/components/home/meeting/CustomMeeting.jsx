import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import postState from '../../../recoil/postState';
import CardSection from '../../../shared/CardSection';
import CustomBlurList from '../../nonLogin/CustomBlurList';

const CustomMeeting = ({ isLoggedIn, currentUserData }) => {
  const postData = useRecoilValue(postState);
  const customList = postData
    ? postData.filter(
        (item) =>
          !item.isDeleted &&
          item.uid !== currentUserData?.uid &&
          item.partyStack.includes(
            currentUserData?.moreInfo?.u_stack.toString(),
          ) &&
          item.partyTime.includes(currentUserData?.moreInfo?.u_time) &&
          item.partyLocation.includes(currentUserData?.moreInfo?.u_location),
      )
    : [];
  return (
    <CustomListWrapper>
      <CustomListContainer>
        {isLoggedIn ? (
          customList.length === 0 ? (
            <CustomListCardBox2>
              <YellowBar>
                <TriAngle1 />
                <NonCustomList>
                  모든 조건이 맞는 모임이 아직 없습니다
                  <br />
                  (기술 스택, 지역, 시간대 종합)
                </NonCustomList>
                <TriAngle2 />
              </YellowBar>
            </CustomListCardBox2>
          ) : (
            <CustomListCardBox>
              <YellowBar>
                <TriAngle1 />
                <CustomDataCardBox>
                  {customList.slice(0, 3).map((item, idx) => (
                    <CardSection key={idx} item={item} />
                  ))}
                </CustomDataCardBox>
                <TriAngle2 />
              </YellowBar>
            </CustomListCardBox>
          )
        ) : (
          <CustomBlurList />
        )}
      </CustomListContainer>
    </CustomListWrapper>
  );
};

export default CustomMeeting;

const CustomListWrapper = styled.div`
  height: 320px;
  width: 100%;
  margin-top: 25px;
`;
const CustomListContainer = styled.div`
  /* width: 1152px; */
  width: 60%;
  height: 320px;
  margin: 0 auto;
`;
const CustomListCardBox = styled.div`
  /* width: 1152px; */
  width: 100%;
  height: 320px;
  margin: 0 auto;
  display: flex;
`;
const CustomListCardBox2 = styled.div`
  /* width: 1152px; */
  width: 100%;
  height: 320px;
  margin: 0 auto;
  display: flex;
`;
const YellowBar = styled.div`
  /* width: 72rem; */
  width: 100%;
  height: 320px;
  background-color: #feff80;
  /* background: linear-gradient(
    rgba(0, 38, 84, 0) 28%,
    #feff80 28%,
    #feff80 72%,
    rgba(0, 38, 84, 0) 72%
  ); */
  background: linear-gradient(#111111 28%, #feff80 28%,
  #feff80 72%, #111111 72%);
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #111111;
`;
const TriAngle1 = styled.div`
  width: 0px;
  height: 0px;
  /* border-bottom: 140px solid transparent; */
  border-bottom: 160px solid transparent;
  border-left: 47px solid #111111;
  /* border-left: 30px solid #9e6060; */
  border-right: 47px solid transparent;
  /* border-right: 60px solid transparent; */
  position: absolute;
  /* top: 90px; */
  top: 80px;
  /* left: 0; */
  left: -1px;
`;
const TriAngle2 = styled.div`
  width: 0px;
  height: 0px;
  /* border-top: 140px solid transparent; */
  border-top: 160px solid transparent;
  border-left: 47px solid transparent;
  border-right: 47px solid #111111;
  position: absolute;
  /* top: 90px; */
  bottom: 80px;
  right: -1px;
`;
const CustomDataCardBox = styled.div`
  /* width: 900px; */
  width: 78.2%;
  margin: 0 auto;
  display: flex;
  gap: 0 30px;
`;
const NonCustomList = styled.div`
  /* width: 900px; */
  width: 78.2%;
  height: 100px;
  margin: 0 auto;
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
`;

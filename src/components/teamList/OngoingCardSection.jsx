import styled from '@emotion/styled';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { authService } from '../../common/firebase';
import { BiCrown } from 'react-icons/bi';

const OngoingCardSection = ({ item, goToTeamPage, showTeamPageBtn }) => {
  return (
    <OngoingMeetingContainer>
      <OngoingMeetingBox>
        <OngoingMeetingTagWrapper>
          <OngoingMeetingTagBox>
            <OngoingMeetingTagItem>
              서울시 {item?.teamPartyStack?.partyLocation}
            </OngoingMeetingTagItem>
            <OngoingMeetingTagItem>
              {item?.teamPartyStack?.partyTime}
            </OngoingMeetingTagItem>
            <OngoingMeetingTagItem>팀원</OngoingMeetingTagItem>
          </OngoingMeetingTagBox>
          {/* {리더 표시해주기} */}
          {item?.teamLeader?.nickName ===
          authService?.currentUser?.displayName ? (
            <BiCrown 
              style={{ fontSize: '26px' }} 
              color='#FFFFFF'
            />
          ) : (
            ''
          )}
        </OngoingMeetingTagWrapper>
        <OngoingMeetingPartyName>
          {/* IOS/안드로이드 앱개발자들의 모각코 */}
          {item?.teamPartyStack?.partyName}
        </OngoingMeetingPartyName>
        <OngoingMeetingStackWrapper>
          <StackBox>
            {/* <StackIcon />
            <StackIcon />
            <StackIcon /> */}
          </StackBox>
          {showTeamPageBtn ? (
            <NavigateArrow>
            <NavigateBtn onClick={()=>goToTeamPage(item.teamID)}>
            <AiOutlineArrowRight 
              style={{ fontSize: '36px' }} 
              color='#FEFF80'
            />
            </NavigateBtn>
          </NavigateArrow>
          ) : (
            ''
          )}
          
        </OngoingMeetingStackWrapper>
      </OngoingMeetingBox>
    </OngoingMeetingContainer>
  );
};

export default OngoingCardSection;

const OngoingMeetingContainer = styled.div`
  width: 379px;
  height: 190px;
  /* margin-top: 20px; */
  /* background-color: #c5eaf3; */
  border-radius: 10px;
  border: 1px solid;
  /* padding: 20px 24px 24px; */
  border-color: #3B3B3B;
  background-color: #232323;
`;
const OngoingMeetingBox = styled.div`
  width: 332px;
  height: 146px;
  margin: 20px 24px 24px;
  background-color: #232323;
`;
const OngoingMeetingTagWrapper = styled.div`
  height: 26px;
  display: flex;
  justify-content: space-between;
`;
const OngoingMeetingTagBox = styled.div`
  width: 250px;
  height: 26px;
  display: flex;
  gap: 0 6px;
`;
const OngoingMeetingTagItem = styled.div`
  height: 26px;
  padding: 4px 10px 3px 10px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 20px;
  background-color: #111111;
  color: #FFFFFF;
`;
const OngoingMeetingPartyName = styled.div`
  height: 24px;
  font-weight: 500;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 50px;
  color: #FFFFFF;
`;
const OngoingMeetingStackWrapper = styled.div`
  width: 332px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  /* background-color: aliceblue; */
`;
const StackBox = styled.div`
  height: 36px;
  display: flex;
  gap: 0 4px;
`;
const StackIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;
const NavigateArrow = styled.div`
  width: 53px;
  height: 36px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* background-color: #D9D9D9; */
`;
const NavigateBtn = styled.div`
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #D9D9D9;
  }
`

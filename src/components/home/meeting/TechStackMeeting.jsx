import {
  MeetingCardBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
  NonRecommendText1,
  TechMediaCardBox,
  NonMeetingCardBox,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { useRecoilValue } from 'recoil';
import postState from '../../../recoil/postState';
import { useMediaQuery } from 'react-responsive';

const TechStackMeeting = ({ isLoggedIn, currentUserData }) => {
  // small screen
  const referenceSize = 1920;
  const isSmallScreen = useMediaQuery({
    query: `(max-width: 1500px)`,
  });
  const postData = useRecoilValue(postState);
  const recommendTechList = postData
    ? postData.filter(
        (item) =>
          !item.isDeleted &&
          item.uid !== currentUserData?.uid &&
          item.partyStack.includes(
            currentUserData?.moreInfo?.u_stack.toString(),
          ),
      )
    : [];

  return (
    <TechStackMeetingArea>
      <MeetingTitleBox>
        <TechStackMeetingTitle>기술 스택에 맞는 모임</TechStackMeetingTitle>
      </MeetingTitleBox>
      
        {recommendTechList.length === 0 ? (
          <NonMeetingCardBox>
            <NonRecommendText1>
            추천 모임이 없습니다.
            <br />
            추가 정보를 등록 or 수정해주세요!
          </NonRecommendText1>
          </NonMeetingCardBox>
        ) : isSmallScreen ? (
          <TechMediaCardBox>
            {recommendTechList
            .slice(0, 2)
            .map((item, idx) => <CardSection key={idx} item={item} db={db} />)}
          </TechMediaCardBox>
        ) : (
          <MeetingCardBox>
            {
              recommendTechList
              .slice(0, 4)
              .map((item, idx) => <CardSection key={idx} item={item} db={db} />)
            }
          </MeetingCardBox>
        )}
      
    </TechStackMeetingArea>
  );
};

export default TechStackMeeting;

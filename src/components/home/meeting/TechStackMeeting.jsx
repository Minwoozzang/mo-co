import {
  MeetingCardBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
  NonRecommendText1,
  TechMediaCardBox,
  NonMeetingCardBox,
  TechStackDesignString,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { useRecoilValue } from 'recoil';
import postState from '../../../recoil/postState';
import { useMediaQuery } from 'react-responsive';

const TechStackMeeting = ({ isLoggedIn, currentUserData }) => {
  const titlestring1 = '{=';
  const titlestring2 = ';';
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
        <TechStackDesignString>{titlestring1}</TechStackDesignString>
        <TechStackMeetingTitle>기술 스택에 맞는 모임</TechStackMeetingTitle>
        <TechStackDesignString>{titlestring2}</TechStackDesignString>
      </MeetingTitleBox>
      
        {recommendTechList.length === 0 ? (
          <NonMeetingCardBox>
            <NonRecommendText1>
            ⚠️ 추천 모임이 없습니다  ⚠️
            <br />
            세부 정보를 등록하거나 모임을 만들어 보세요
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

import {
  MeetingCardBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
  NonRecommendText1,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { useRecoilValue } from 'recoil';
import postState from '../../../recoil/postState';

const TechStackMeeting = ({
  isLoggedIn,
  // recommendTechList,
  currentUserData,
}) => {
  const postData = useRecoilValue(postState);
  const recommendTechList = postData
    ? postData.filter(
        (item) =>
          !item.isDeleted &&
          item.partyStack.includes(
            currentUserData[0]?.moreInfo?.u_stack.toString(),
          ),
      )
    : [];

  return (
    <TechStackMeetingArea>
      <MeetingTitleBox>
        <TechStackMeetingTitle>기술 스택에 맞는 모임</TechStackMeetingTitle>
      </MeetingTitleBox>
      <MeetingCardBox>
        {recommendTechList.length === 0 ? (
          <NonRecommendText1>
            추천 모임이 없습니다.
            <br />
            추가 정보를 등록 or 수정해주세요!
          </NonRecommendText1>
        ) : (
          recommendTechList
            .slice(0, 4)
            .map((item, idx) => <CardSection key={idx} item={item} db={db} />)
        )}
      </MeetingCardBox>
    </TechStackMeetingArea>
  );
};

export default TechStackMeeting;

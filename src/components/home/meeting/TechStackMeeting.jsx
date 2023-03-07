import {
  MeetingCardBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
  NonRecommendText1,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';

const TechStackMeeting = ({
  isLoggedIn,
  recommendTechList,
  uid,
  userBookmark,
}) => {
  // console.log('recommendTechList', recommendTechList);

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
            .map((item, idx) => (
              <CardSection
                key={idx}
                item={item}
                db={db}
                uid={uid}
                userBookmark={userBookmark}
              />
            ))
        )}
      </MeetingCardBox>
    </TechStackMeetingArea>
  );
};

export default TechStackMeeting;

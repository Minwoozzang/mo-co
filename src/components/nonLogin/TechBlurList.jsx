import {
  MeetingCardBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';

const TechBlurList = ({ isLoggedIn, blurList }) => {
  return (
    <TechStackMeetingArea>
      <MeetingTitleBox>
        <TechStackMeetingTitle>기술 스택에 맞는 모임</TechStackMeetingTitle>
      </MeetingTitleBox>
      <MeetingCardBox>
        {blurList.map((item, idx) => (
          <BlurCard key={idx} />
        ))}
      </MeetingCardBox>
    </TechStackMeetingArea>
  );
};

export default TechBlurList;

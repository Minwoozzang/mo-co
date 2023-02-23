import {
  TimeMeetingArea,
  MeetingTitleBox,
  MeetingCardBox,
  TimeMeetingTitle,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';

const TimeBlurList = ({ isLoggedIn, blurList }) => {
  return (
    <TimeMeetingArea>
      <MeetingTitleBox>
        <TimeMeetingTitle>시간대가 맞는 모임</TimeMeetingTitle>
      </MeetingTitleBox>
      <MeetingCardBox>
        {blurList.map((item, idx) => (
          <BlurCard key={idx} />
        ))}
      </MeetingCardBox>
    </TimeMeetingArea>
  );
};

export default TimeBlurList;

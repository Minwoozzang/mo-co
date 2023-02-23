import {
  TimeMeetingArea,
  MeetingTitleBox,
  MeetingCardBox,
  TimeMeetingTitle,
  TimeMeetingInnerSection1,
  TimeMeetingCardBox,
  TimeMeetingInnerSection2,
  TimeMeetingInnerBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';

const TimeBlurList = ({ isLoggedIn, blurList }) => {
  return (
    <TimeMeetingArea>
      <TimeMeetingInnerSection1>
      <MeetingTitleBox>
        <TimeMeetingTitle>시간대가 맞는 모임</TimeMeetingTitle>
      </MeetingTitleBox>
      </TimeMeetingInnerSection1>
     <TimeMeetingInnerSection2>
      <TimeMeetingInnerBox />
     <TimeMeetingCardBox>
        {blurList.slice(0, 3).map((item, idx) => (
          <BlurCard key={idx} />
        ))}
      </TimeMeetingCardBox>
     </TimeMeetingInnerSection2>
    </TimeMeetingArea>
  );
};

export default TimeBlurList;

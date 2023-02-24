import {
  TimeMeetingArea,
  MeetingTitleBox,
  MeetingCardBox,
  TimeMeetingTitle,
  TimeMeetingInnerSection1,
  TimeMeetingCardBox,
  TimeMeetingInnerSection2,
  TimeMeetingInnerBox,
  TimeMeetingLeftCornerBox,
  TimeMeetingTitleBox1,
  TimeMeetingTitleBox3,
  TimeMeetingTitleBox2,
  TimeMeetingTitleBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';

const TimeBlurList = ({ isLoggedIn, blurList }) => {
  const titlestring = '</---*';
  const titlestring1 = '{=';
  const titlestring2 = '{';

  return (
    <TimeMeetingArea>
      <TimeMeetingInnerSection1>
        <TimeMeetingLeftCornerBox>
          {titlestring}
        </TimeMeetingLeftCornerBox>
      <TimeMeetingTitleBox>
        <TimeMeetingTitleBox1>
          {titlestring1}
        </TimeMeetingTitleBox1>
        <TimeMeetingTitle>시간대가 맞는 모임</TimeMeetingTitle>
        <TimeMeetingTitleBox2>;</TimeMeetingTitleBox2>
      </TimeMeetingTitleBox>
      <TimeMeetingTitleBox3>{titlestring2}</TimeMeetingTitleBox3>
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

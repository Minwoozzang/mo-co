import {
  LocationMeetingArea,
  LocationMeetingCardBox,
  LocationMeetingInnerBox,
  LocationMeetingInnerSection1,
  LocationMeetingInnerSection2,
  LocationMeetingTitleBox,
  LocationMeetingTitleBox1,
  LocationMeetingTitleBox2,
  LocationMeetingTitleBox3,
  LocationTitle,
  MeetingTitleBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';

const LocationBlurList = ({ isLoggedIn, blurList }) => {
  const titlestring1 = '{=';
  const titlestring2 = ';';
  const titlestring3 = '} * --- />';

  return (
    <>
      <LocationMeetingArea>
        <LocationMeetingInnerSection1>
        <LocationMeetingTitleBox>
        <LocationMeetingTitleBox1>{titlestring1}</LocationMeetingTitleBox1>
          <LocationTitle>지역이 맞는 모임</LocationTitle>
          <LocationMeetingTitleBox2>{titlestring2}</LocationMeetingTitleBox2>
        </LocationMeetingTitleBox>
        <LocationMeetingTitleBox3>{titlestring3}</LocationMeetingTitleBox3>
        </LocationMeetingInnerSection1>
       <LocationMeetingInnerSection2>
        <LocationMeetingInnerBox />
       <LocationMeetingCardBox>
          {blurList.slice(0, 3).map((item, idx) => (
            <BlurCard key={idx} />
          ))}
        </LocationMeetingCardBox>
       </LocationMeetingInnerSection2>
      </LocationMeetingArea>
    </>
  );
};

export default LocationBlurList;

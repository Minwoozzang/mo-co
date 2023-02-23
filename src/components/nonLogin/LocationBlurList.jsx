import {
  LocationMeetingArea,
  LocationMeetingCardBox,
  LocationMeetingInnerBox,
  LocationMeetingInnerSection1,
  LocationMeetingInnerSection2,
  LocationTitle,
  MeetingTitleBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';

const LocationBlurList = ({ isLoggedIn, blurList }) => {
  return (
    <>
      <LocationMeetingArea>
        <LocationMeetingInnerSection1>
        <MeetingTitleBox>
          <LocationTitle>지역이 맞는 모임</LocationTitle>
        </MeetingTitleBox>
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

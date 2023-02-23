import {
  LocationMeetingArea,
  LocationMeetingCardBox,
  LocationTitle,
  MeetingTitleBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';

const LocationBlurList = ({ isLoggedIn, blurList }) => {
  return (
    <>
      <LocationMeetingArea>
        <MeetingTitleBox>
          <LocationTitle>지역이 맞는 모임</LocationTitle>
        </MeetingTitleBox>
        <LocationMeetingCardBox>
          {blurList.map((item, idx) => (
            <BlurCard key={idx} />
          ))}
        </LocationMeetingCardBox>
      </LocationMeetingArea>
    </>
  );
};

export default LocationBlurList;

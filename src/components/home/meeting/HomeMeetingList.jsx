import {
  MeetingArea,
  TechAndTimeMeetingArea,
} from '../../homestyle/homemeeting';
import HomeBlurList from '../../nonLogin/HomeBlurList';
import LocationMeeting from './LocationMeeting';
import TechStackMeeting from './TechStackMeeting';
import TimeMeeting from './TimeMeeting';

const HomeMeetingList = ({
  isLoggedIn,
  recommendTechList,
  recommendTimeList,
  recommendLocationList,
}) => {
  // 로그인 안 됐을 때 리스트
  const blurList = [1, 2, 3];
  return (
    <MeetingArea>
      {isLoggedIn ? (
        <>
          <TechAndTimeMeetingArea>
            <TechStackMeeting 
              isLoggedIn={isLoggedIn} 
              recommendTechList={recommendTechList} />
            <TimeMeeting 
              isLoggedIn={isLoggedIn}
              recommendTimeList={recommendTimeList} />
          </TechAndTimeMeetingArea>
          <LocationMeeting 
            isLoggedIn={isLoggedIn}
            recommendLocationList={recommendLocationList} />
        </>
      ) : (
        <>
          <HomeBlurList blurList={blurList}/>
        </>
      )}
    </MeetingArea>
  );
};

export default HomeMeetingList;

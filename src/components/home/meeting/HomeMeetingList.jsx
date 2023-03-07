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
  // recommendTechList,
  // recommendTimeList,
  // recommendLocationList,
  currentUserData,
}) => {
  // 로그인 안 됐을 때 리스트
  const blurList = [1, 2, 3, 4];

  return (
    <MeetingArea>
      {isLoggedIn ? (
        <>
          <TechAndTimeMeetingArea>
            <TechStackMeeting
              // recommendTechList={recommendTechList}
              currentUserData={currentUserData}
            />
          </TechAndTimeMeetingArea>
          <TimeMeeting
            // recommendTimeList={recommendTimeList}
            currentUserData={currentUserData}
          />
          <LocationMeeting
            // recommendLocationList={recommendLocationList}
            currentUserData={currentUserData}
          />
        </>
      ) : (
        <>
          <HomeBlurList blurList={blurList} />
        </>
      )}
    </MeetingArea>
  );
};

export default HomeMeetingList;

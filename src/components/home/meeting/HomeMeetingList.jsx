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
  uid,
  userBookmark,
}) => {
  // 로그인 안 됐을 때 리스트
  const blurList = [1, 2, 3, 4];
  return (
    <MeetingArea>
      {isLoggedIn ? (
        <>
          <TechAndTimeMeetingArea>
            <TechStackMeeting
              recommendTechList={recommendTechList}
              uid={uid}
              userBookmark={userBookmark}
            />
          </TechAndTimeMeetingArea>
          <TimeMeeting
            recommendTimeList={recommendTimeList}
            uid={uid}
            userBookmark={userBookmark}
          />
          <LocationMeeting
            recommendLocationList={recommendLocationList}
            uid={uid}
            userBookmark={userBookmark}
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

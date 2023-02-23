import { MeetingArea, TechAndTimeMeetingArea } from '../homestyle/homemeeting';
import LocationBlurList from './LocationBlurList';
import TechBlurList from './TechBlurList';
import TimeBlurList from './TimeBlurList';

const HomeBlurList = ({
  blurList,
  isLoggedIn,
  recommendTechList,
  recommendTimeList,
  recommendLocationList,
}) => {
  return (
    <MeetingArea>
      <TechAndTimeMeetingArea>
        <TechBlurList
          isLoggedIn={isLoggedIn}
          blurList={blurList}
        />
        <TimeBlurList
          isLoggedIn={isLoggedIn}
          blurList={blurList}
        />
      </TechAndTimeMeetingArea>
      <LocationBlurList
        isLoggedIn={isLoggedIn}
        blurList={blurList}
      />
    </MeetingArea>
  );
};

export default HomeBlurList;

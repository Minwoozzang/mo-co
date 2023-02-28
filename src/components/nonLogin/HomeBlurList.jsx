import { MeetingArea, TechAndTimeMeetingArea } from '../homestyle/homemeeting';
import LocationBlurList from './LocationBlurList';
import TechBlurList from './TechBlurList';
import TimeBlurList from './TimeBlurList';

const HomeBlurList = ({
  blurList,
  isLoggedIn,
}) => {
  return (
    <MeetingArea>
      <TechAndTimeMeetingArea>
        <TechBlurList
          isLoggedIn={isLoggedIn}
          blurList={blurList}
        />
      </TechAndTimeMeetingArea>
      <TimeBlurList
          isLoggedIn={isLoggedIn}
          blurList={blurList}
        />
      <LocationBlurList
        isLoggedIn={isLoggedIn}
        blurList={blurList}
      />
    </MeetingArea>
  );
};

export default HomeBlurList;

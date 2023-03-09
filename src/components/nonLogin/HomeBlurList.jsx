import { MeetingArea, TechStackMeetingContainer } from '../homestyle/homemeeting';
import LocationBlurList from './LocationBlurList';
import TechBlurList from './TechBlurList';
import TimeBlurList from './TimeBlurList';

const HomeBlurList = ({
  blurList,
  isLoggedIn,
}) => {
  return (
    <MeetingArea>
      <TechStackMeetingContainer>
        <TechBlurList
          isLoggedIn={isLoggedIn}
          blurList={blurList}
        />
      </TechStackMeetingContainer>
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

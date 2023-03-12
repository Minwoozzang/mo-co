import styled from '@emotion/styled';
import { useMediaQuery } from 'react-responsive';
import {
  MeetingArea,
  TechStackMeetingContainer,
} from '../../homestyle/homemeeting';
import HomeBlurList from '../../nonLogin/HomeBlurList';
import LocationMeeting from './LocationMeeting';
import TechStackMeeting from './TechStackMeeting';
import TimeMeeting from './TimeMeeting';

const HomeMeetingList = ({ isLoggedIn, currentUserData }) => {
  // 로그인 안 됐을 때 리스트
  const blurList = [1, 2, 3, 4];

  const isSmallScreen = useMediaQuery({
    query: `(max-width: 1420px)`,
  });

  return (
    <MeetingArea>
      {isLoggedIn ? (
        <>
          <TechStackMeetingContainer>
            <TechStackMeeting currentUserData={currentUserData} />
          </TechStackMeetingContainer>
          <TimeMeeting currentUserData={currentUserData} />
          {isSmallScreen ? <div></div> : <TimeAndLocationGap />}
          <LocationMeeting currentUserData={currentUserData} />
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

const TimeAndLocationGap = styled.div`
  height: 150px;
  width: 100%;
  /* background-color: aliceblue; */
`;

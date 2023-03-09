import styled from '@emotion/styled';
import {
  MeetingArea,
  TechStackMeetingContainer,
} from '../homestyle/homemeeting';
import LocationBlurList from './LocationBlurList';
import TechBlurList from './TechBlurList';
import TimeBlurList from './TimeBlurList';

const HomeBlurList = ({ blurList, isLoggedIn }) => {
  return (
    <MeetingArea>
      <TechStackMeetingContainer>
        <TechBlurList isLoggedIn={isLoggedIn} blurList={blurList} />
      </TechStackMeetingContainer>
      <TimeBlurList isLoggedIn={isLoggedIn} blurList={blurList} />
      <TimeAndLocationGap />
      <LocationBlurList isLoggedIn={isLoggedIn} blurList={blurList} />
    </MeetingArea>
  );
};

export default HomeBlurList;

const TimeAndLocationGap = styled.div`
  height: 150px;
  width: 100%;
`;

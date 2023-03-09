import {
  MeetingCardBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
  TechMediaCardBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const TechBlurList = ({ isLoggedIn, blurList }) => {
  const navigate = useNavigate();
  // small screen
  const referenceSize = 1920;
  const isSmallScreen = useMediaQuery({
    query: `(max-width: 1500px)`,
  });
  return (
    <TechStackMeetingArea>
      <MeetingTitleBox>
        <TechStackMeetingTitle>기술 스택에 맞는 모임</TechStackMeetingTitle>
      </MeetingTitleBox>
      {isSmallScreen ? (
         <>
         
        <TechMediaCardBox style={{position: 'relative'}}>
        <GuideText onClick={() => navigate('/login')}>
         로그인이 필요합니다
       </GuideText>
        {blurList.slice(0,2).map((item, idx) => (
          <BlurCard key={idx} />
        ))}
      
      </TechMediaCardBox>
         </>
      ) : (
        <div>
          
      <MeetingCardBox style={{position: 'relative'}}>
      <GuideText onClick={() => navigate('/login')}>
        로그인이 필요합니다
      </GuideText>
        {blurList.map((item, idx) => (
          <BlurCard key={idx} />
        ))}
      </MeetingCardBox>
        </div>
      )}
    </TechStackMeetingArea>
  );
};

export default TechBlurList;

const GuideText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 400;
  position: absolute;
  z-index: 9999;
  /* top: 41.5%; */
  top: 50%;
  /* left: 33%; */
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #feff80;
  box-shadow: 0 0 10px 0 rgba(66, 66, 66, 0.5);
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

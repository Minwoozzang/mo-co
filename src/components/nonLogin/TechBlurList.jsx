import {
  MeetingCardBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const TechBlurList = ({ isLoggedIn, blurList }) => {
  const navigate = useNavigate();
  return (
    <TechStackMeetingArea>
      <MeetingTitleBox>
        <TechStackMeetingTitle>기술 스택에 맞는 모임</TechStackMeetingTitle>
      </MeetingTitleBox>
      <GuideText onClick={() => navigate('/login')}>
        로그인이 필요합니다
      </GuideText>
      <MeetingCardBox>
        {blurList.map((item, idx) => (
          <BlurCard key={idx} />
        ))}
      </MeetingCardBox>
    </TechStackMeetingArea>
  );
};

export default TechBlurList;

const GuideText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  z-index: 9999;
  top: 41.5%;
  left: 33%;
  background-color: #feff80;
  box-shadow: 0 0 10px 0 rgba(66, 66, 66, 0.5);
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

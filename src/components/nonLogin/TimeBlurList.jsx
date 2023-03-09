import {
  TimeMeetingArea,
  TimeMeetingTitle,
  TimeMeetingInnerSection1,
  TimeMeetingCardBox,
  TimeMeetingInnerSection2,
  TimeMeetingInnerBox,
  TimeMeetingLeftCornerBox,
  TimeMeetingTitleBox1,
  TimeMeetingTitleBox3,
  TimeMeetingTitleBox2,
  TimeMeetingTitleBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const TimeBlurList = ({ isLoggedIn, blurList }) => {
  const navigate = useNavigate();

  const titlestring = '</---*';
  const titlestring1 = '{=';
  const titlestring2 = '{';

  return (
    <TimeMeetingArea>
      <TimeMeetingInnerSection1>
        <TimeMeetingLeftCornerBox>{titlestring}</TimeMeetingLeftCornerBox>
        <TimeMeetingTitleBox>
          <TimeMeetingTitleBox1>{titlestring1}</TimeMeetingTitleBox1>
          <TimeMeetingTitle>시간대가 맞는 모임</TimeMeetingTitle>
          <TimeMeetingTitleBox2>;</TimeMeetingTitleBox2>
        </TimeMeetingTitleBox>
        <TimeMeetingTitleBox3>{titlestring2}</TimeMeetingTitleBox3>
      </TimeMeetingInnerSection1>
      <TimeMeetingInnerSection2>
        <TimeMeetingInnerBox />
        <GuideText onClick={() => navigate('/login')}>
          로그인이 필요합니다
        </GuideText>
        <TimeMeetingCardBox>
          {blurList.slice(0, 3).map((item, idx) => (
            <BlurCard key={idx} />
          ))}
        </TimeMeetingCardBox>
      </TimeMeetingInnerSection2>
    </TimeMeetingArea>
  );
};

export default TimeBlurList;

const GuideText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  z-index: 9999;
  top: 35%;
  left: 39%;
  background-color: #feff80;
  box-shadow: 0 0 10px 0 rgba(66, 66, 66, 0.5);
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

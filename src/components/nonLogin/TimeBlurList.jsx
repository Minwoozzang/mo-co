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
  TimeMeetingBox,
  TimeMeetingTopBox,
  TimeMeetingMediaBox,
  TimeMeetingMediaLeftCornerBox,
  TimeMeetingMediaTitleBox,
  TimeMeetingMediaTitle,
  TimeMeetingMediaCardBox,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const TimeBlurList = ({ isLoggedIn, blurList }) => {
  const navigate = useNavigate();
  // small screen
  const referenceSize = 1920;
  const isSmallScreen1 = useMediaQuery({
    query: `(min-width: 1420px)`,
  });
  const isSmallScreen2 = useMediaQuery({
    query: `(min-width: 1072px) and (max-width: 1420px)`,
  });
  const isSmallScreen3 = useMediaQuery({
    query: `(max-width: 1072px)`,
  });

  const blurList1 = [1, 2];

  const titlestring = '</---*';
  const titlestring1 = '{=';
  const titlestring2 = '{';

  return (
    <TimeMeetingArea>
      {isSmallScreen1 && (
        <div>
          <TimeMeetingTopBox />
          <TimeMeetingBox>
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
          </TimeMeetingBox>
        </div>
      )}
      {isSmallScreen2 && (
        <TimeMeetingMediaBox>
          <TimeMeetingMediaLeftCornerBox>
            <TimeMeetingMediaTitleBox>{titlestring}</TimeMeetingMediaTitleBox>
            <TimeMeetingMediaTitle>시간대가 맞는 모임</TimeMeetingMediaTitle>
          </TimeMeetingMediaLeftCornerBox>
          <TimeMeetingMediaCardBox style={{ position: 'relative' }}>
            <MediaGuideText onClick={() => navigate('/login')}>
              로그인이 필요합니다
            </MediaGuideText>
            {blurList.slice(0, 3).map((item, idx) => (
              <BlurCard key={idx} />
            ))}
          </TimeMeetingMediaCardBox>
        </TimeMeetingMediaBox>
      )}
      {isSmallScreen3 && (
        <TimeMeetingMediaBox>
          <TimeMeetingMediaLeftCornerBox>
            <TimeMeetingMediaTitleBox>{titlestring}</TimeMeetingMediaTitleBox>
            <TimeMeetingMediaTitle>시간대가 맞는 모임</TimeMeetingMediaTitle>
          </TimeMeetingMediaLeftCornerBox>
          <TimeMeetingMediaCardBox style={{ position: 'relative' }}>
            <MediaGuideText onClick={() => navigate('/login')}>
              로그인이 필요합니다
            </MediaGuideText>
            {blurList1.map((item, idx) => (
              <BlurCard key={idx} />
            ))}
          </TimeMeetingMediaCardBox>
        </TimeMeetingMediaBox>
      )}
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
const MediaGuideText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 400;
  position: absolute;
  z-index: 9999;
  /* top: 35%;
  left: 39%; */
  top: 40%;
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

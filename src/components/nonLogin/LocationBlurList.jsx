import {
  LocationMeetingArea,
  LocationMeetingCardBox,
  LocationMeetingInnerBox,
  LocationMeetingInnerSection1,
  LocationMeetingInnerSection2,
  LocationMeetingMediaBox,
  LocationMeetingMediaCardBox,
  LocationMeetingMediaLeftCornerBox,
  LocationMeetingMediaTitle,
  LocationMeetingMediaTitleBox,
  LocationMeetingTitleBox,
  LocationMeetingTitleBox1,
  LocationMeetingTitleBox2,
  LocationMeetingTitleBox3,
  LocationTitle,
} from '../homestyle/homemeeting';
import BlurCard from './blurcard/BlurCard';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const LocationBlurList = ({ isLoggedIn, blurList }) => {
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

  const titlestring1 = '{=';
  const titlestring2 = ';';
  const titlestring3 = '} * --- />';
  const titlestring4 = '* --- />';
  const navigate = useNavigate();

  return (
    <>
      {isSmallScreen1 && (
        <LocationMeetingArea>
          <LocationMeetingInnerSection1>
            <LocationMeetingTitleBox>
              <LocationMeetingTitleBox1>
                {titlestring1}
              </LocationMeetingTitleBox1>
              <LocationTitle>지역이 맞는 모임</LocationTitle>
              <LocationMeetingTitleBox2>
                {titlestring2}
              </LocationMeetingTitleBox2>
            </LocationMeetingTitleBox>
            <LocationMeetingTitleBox3>{titlestring3}</LocationMeetingTitleBox3>
          </LocationMeetingInnerSection1>
          <LocationMeetingInnerSection2>
            <LocationMeetingInnerBox />
            <GuideText onClick={() => navigate('/login')}>
              로그인이 필요합니다
            </GuideText>
            <LocationMeetingCardBox>
              {blurList.slice(0, 3).map((item, idx) => (
                <BlurCard key={idx} />
              ))}
            </LocationMeetingCardBox>
          </LocationMeetingInnerSection2>
        </LocationMeetingArea>
      )}
      {isSmallScreen2 && (
        <LocationMeetingMediaBox>
          <LocationMeetingMediaLeftCornerBox>
            <LocationMeetingMediaTitle>
              지역이 맞는 모임
            </LocationMeetingMediaTitle>
            <LocationMeetingMediaTitleBox>
              {titlestring4}
            </LocationMeetingMediaTitleBox>
          </LocationMeetingMediaLeftCornerBox>
          <LocationMeetingMediaCardBox style={{ position: 'relative' }}>
            <MediaGuideText onClick={() => navigate('/login')}>
              로그인이 필요합니다
            </MediaGuideText>
            {blurList.slice(0, 3).map((item, idx) => (
              <BlurCard key={idx} />
            ))}
          </LocationMeetingMediaCardBox>
        </LocationMeetingMediaBox>
      )}
      {isSmallScreen3 && (
        <LocationMeetingMediaBox>
          <LocationMeetingMediaLeftCornerBox>
            <LocationMeetingMediaTitle>
              지역이 맞는 모임
            </LocationMeetingMediaTitle>
            <LocationMeetingMediaTitleBox>
              {titlestring4}
            </LocationMeetingMediaTitleBox>
          </LocationMeetingMediaLeftCornerBox>
          <LocationMeetingMediaCardBox style={{ position: 'relative' }}>
            <MediaGuideText onClick={() => navigate('/login')}>
              로그인이 필요합니다
            </MediaGuideText>
            {blurList1.map((item, idx) => (
              <BlurCard key={idx} />
            ))}
          </LocationMeetingMediaCardBox>
        </LocationMeetingMediaBox>
      )}
    </>
  );
};

export default LocationBlurList;

const GuideText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  z-index: 9999;
  top: 40%;
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

import {
  LocationTitle,
  LocationMeetingArea,
  LocationMeetingCardBox,
  LocationMeetingInnerSection1,
  LocationMeetingInnerSection2,
  LocationMeetingInnerBox,
  LocationMeetingTitleBox,
  LocationMeetingTitleBox1,
  LocationMeetingTitleBox2,
  LocationMeetingTitleBox3,
  NonRecommendText2,
  LocationMeetingMediaBox,
  LocationMeetingMediaTitleBox,
  LocationMeetingMediaLeftCornerBox,
  LocationMeetingMediaTitle,
  LocationMeetingMediaCardBox,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { useRecoilValue } from 'recoil';
import postState from '../../../recoil/postState';
import { useMediaQuery } from 'react-responsive';

const LocationMeeting = ({ currentUserData }) => {
  // small screen
  const referenceSize = 1920;
  const isSmallScreen1 = useMediaQuery({
    query: `(min-width: 1420px)`,
  });
  const isSmallScreen2 = useMediaQuery({
    query: `(min-width: 1080px) and (max-width: 1420px)`,
  });
  const isSmallScreen3 = useMediaQuery({
    query: `(max-width: 1080px)`,
  });

  const titlestring1 = '{=';
  const titlestring2 = ';';
  const titlestring3 = '} * --- />';
  const titlestring4 = '* --- />';

  const postData = useRecoilValue(postState);
  const recommendLocationList = postData
    ? postData.filter(
        (item) =>
          !item.isDeleted &&
          item.uid !== currentUserData?.uid &&
          item.partyLocation.includes(currentUserData?.moreInfo?.u_location),
      )
    : [];

  return (
    <>
      <LocationMeetingArea>
        {isSmallScreen1 && (
          <>
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
              <LocationMeetingTitleBox3>
                {titlestring3}
              </LocationMeetingTitleBox3>
            </LocationMeetingInnerSection1>
            <LocationMeetingInnerSection2>
              <LocationMeetingInnerBox />
              <LocationMeetingCardBox>
                {recommendLocationList.length === 0 ? (
                  <NonRecommendText2>
                    ⚠️ 추천 모임이 없습니다 ⚠️
                    <br />
                    세부 정보를 등록하거나 모임을 만들어 보세요
                  </NonRecommendText2>
                ) : (
                  recommendLocationList
                    .slice(0, 3)
                    .map((item, idx) => (
                      <CardSection
                        key={`지역이 맞는 모임 ${idx}`}
                        item={item}
                        db={db}
                      />
                    ))
                )}
              </LocationMeetingCardBox>
            </LocationMeetingInnerSection2>
          </>
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
            <LocationMeetingMediaCardBox>
              {recommendLocationList.length === 0 ? (
                <NonRecommendText2>
                  ⚠️ 추천 모임이 없습니다 ⚠️
                  <br />
                  세부 정보를 등록하거나 모임을 만들어 보세요
                </NonRecommendText2>
              ) : (
                recommendLocationList
                  .slice(0, 3)
                  .map((item, idx) => (
                    <CardSection
                      key={`지역이 맞는 모임 ${idx}`}
                      item={item}
                      db={db}
                    />
                  ))
              )}
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
            <LocationMeetingMediaCardBox>
              {recommendLocationList.length === 0 ? (
                <NonRecommendText2>
                  ⚠️ 추천 모임이 없습니다 ⚠️
                  <br />
                  세부 정보를 등록하거나 모임을 만들어 보세요
                </NonRecommendText2>
              ) : (
                recommendLocationList
                  .slice(0, 2)
                  .map((item, idx) => (
                    <CardSection
                      key={`지역이 맞는 모임 ${idx}`}
                      item={item}
                      db={db}
                    />
                  ))
              )}
            </LocationMeetingMediaCardBox>
          </LocationMeetingMediaBox>
        )}
      </LocationMeetingArea>
    </>
  );
};

export default LocationMeeting;

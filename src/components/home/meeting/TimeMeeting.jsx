import {
  TimeMeetingArea,
  TimeMeetingTitle,
  TimeMeetingInnerSection1,
  TimeMeetingCardBox,
  TimeMeetingInnerSection2,
  TimeMeetingInnerBox,
  TimeMeetingLeftCornerBox,
  TimeMeetingTitleBox,
  TimeMeetingTitleBox1,
  TimeMeetingTitleBox2,
  TimeMeetingTitleBox3,
  NonRecommendText2,
  TimeMeetingBox,
  TimeMeetingTopBox,
  TimeMeetingMediaBox,
  TimeMeetingMediaLeftCornerBox,
  TimeMeetingMediaTitleBox,
  TimeMeetingMediaTitle,
  TimeMeetingMediaCardBox,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { useRecoilValue } from 'recoil';
import postState from '../../../recoil/postState';
import { useMediaQuery } from 'react-responsive';

const TimeMeeting = ({ currentUserData }) => {
  // small screen
  const referenceSize = 1920;
  const isSmallScreen = useMediaQuery({
    query: `(max-width: 1420px)`,
  });
  // const isSmallScreen = useMediaQuery({
  //   query: `(max-width: ${referenceSize*0.5}px)`,
  // });

  const titlestring = '</---*';
  const titlestring1 = '{=';
  const titlestring2 = '}';

  const postData = useRecoilValue(postState);
  const recommendTimeList = postData
    ? postData.filter(
        (item) =>
          !item.isDeleted &&
          item.uid !== currentUserData?.uid &&
          item.partyTime.includes(currentUserData?.moreInfo?.u_time),
      )
    : [];

  return (
    <TimeMeetingArea>
      {isSmallScreen ? (
        <TimeMeetingMediaBox>
          <TimeMeetingMediaLeftCornerBox>
            <TimeMeetingMediaTitleBox>{titlestring}</TimeMeetingMediaTitleBox>
            <TimeMeetingMediaTitle>시간대가 맞는 모임</TimeMeetingMediaTitle>
          </TimeMeetingMediaLeftCornerBox>
          <TimeMeetingMediaCardBox>
            {recommendTimeList.length === 0 ? (
              <NonRecommendText2>
                추천 모임이 없습니다.
                <br />
                추가 정보를 등록 or 수정해주세요!
              </NonRecommendText2>
            ) : (
              recommendTimeList
                .slice(0, 3)
                .map((item, idx) => (
                  <CardSection
                    key={`시간대가 맞는 모임 ${idx}`}
                    item={item}
                    db={db}
                  />
                ))
            )}
          </TimeMeetingMediaCardBox>
        </TimeMeetingMediaBox>
      ) : (
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
              <TimeMeetingCardBox>
                {recommendTimeList.length === 0 ? (
                  <NonRecommendText2>
                    추천 모임이 없습니다.
                    <br />
                    추가 정보를 등록 or 수정해주세요!
                  </NonRecommendText2>
                ) : (
                  recommendTimeList
                    .slice(0, 3)
                    .map((item, idx) => (
                      <CardSection
                        key={`시간대가 맞는 모임 ${idx}`}
                        item={item}
                        db={db}
                      />
                    ))
                )}
              </TimeMeetingCardBox>
            </TimeMeetingInnerSection2>
          </TimeMeetingBox>
        </div>
      )}
    </TimeMeetingArea>
  );
};

export default TimeMeeting;

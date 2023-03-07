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
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { useRecoilValue } from 'recoil';
import postState from '../../../recoil/postState';

const LocationMeeting = ({ uid, userBookmark, currentUserData }) => {
  const titlestring1 = '{=';
  const titlestring2 = ';';
  const titlestring3 = '} * --- />';

  const postData = useRecoilValue(postState);
  const recommendLocationList = postData
    ? postData.filter(
        (item) =>
          !item.isDeleted &&
          item.partyLocation.includes(currentUserData[0]?.moreInfo?.u_location),
      )
    : [];

  return (
    <>
      <LocationMeetingArea>
        <LocationMeetingInnerSection1>
          <LocationMeetingTitleBox>
            <LocationMeetingTitleBox1>{titlestring1}</LocationMeetingTitleBox1>
            <LocationTitle>지역이 맞는 모임</LocationTitle>
            <LocationMeetingTitleBox2>{titlestring2}</LocationMeetingTitleBox2>
          </LocationMeetingTitleBox>
          <LocationMeetingTitleBox3>{titlestring3}</LocationMeetingTitleBox3>
        </LocationMeetingInnerSection1>
        <LocationMeetingInnerSection2>
          <LocationMeetingInnerBox />
          <LocationMeetingCardBox>
            {recommendLocationList.length === 0 ? (
              <NonRecommendText2>
                추천 모임이 없습니다.
                <br />
                추가 정보를 등록 or 수정해주세요!
              </NonRecommendText2>
            ) : (
              recommendLocationList
                .slice(0, 3)
                .map((item, idx) => (
                  <CardSection
                    key={`지역이 맞는 모임 ${idx}`}
                    item={item}
                    db={db}
                    uid={uid}
                    userBookmark={userBookmark}
                  />
                ))
            )}
          </LocationMeetingCardBox>
        </LocationMeetingInnerSection2>
      </LocationMeetingArea>
    </>
  );
};

export default LocationMeeting;

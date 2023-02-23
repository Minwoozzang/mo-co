import {
  MeetingTitleBox,
  MeetingMoreBox,
  LocationTitle,
  LocationMeetingArea,
  LocationMeetingCardBox,
  LocationMeetingInnerSection1,
  LocationMeetingInnerSection2,
  LocationMeetingInnerBox,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { MdExpandMore } from 'react-icons/md';
import { useQueries } from 'react-query';
import { getPost, getUser } from '../../../common/utils/getApi';
import { useEffect, useState } from 'react';

const LocationMeeting = ({ recommendLocationList }) => {
  // const [recommendLocationList, setRecommendLocationList] = useState([]);
  // const result = useQueries([
  //   {
  //     queryKey: ['user'],
  //     queryFn: getUser,
  //   },
  //   {
  //     queryKey: ['post'],
  //     queryFn: getPost,
  //   },
  // ]);

  // useEffect(() => {
  //   console.log(result); // [{rune 정보, data: [], isSucces: true ...}, {spell 정보, data: [], isSucces: true ...}]
  //   const loadingFinishAll = result.some((result) => result.isLoading);
  //   console.log(loadingFinishAll); // loadingFinishAll이 false이면 최종 완료

  //   if (loadingFinishAll === false) {
  //     const newrecommendLocationList = result[1]?.data?.filter((item) =>
  //       item.partyLocation.includes(result[0]?.data[0]?.moreInfo.u_location),
  //     );

  //     if (
  //       result[1]?.data?.length > 0 &&
  //       newrecommendLocationList?.length > 0 &&
  //       recommendLocationList?.length === 0
  //     ) {
  //       setRecommendLocationList(newrecommendLocationList);
  //     }
  //   }
  // }, [result, recommendLocationList]);

  // console.log('recommendLocationList', recommendLocationList);

  return (
    <>
      <LocationMeetingArea>
        <LocationMeetingInnerSection1>
        <MeetingTitleBox>
          <LocationTitle>지역이 맞는 모임</LocationTitle>
        </MeetingTitleBox>
        </LocationMeetingInnerSection1>
       <LocationMeetingInnerSection2>
        <LocationMeetingInnerBox />
       <LocationMeetingCardBox>
          {recommendLocationList?.length > 0 &&
            recommendLocationList
              .slice(0, 3)
              .map((item, idx) => (
                <CardSection
                  key={`지역이 맞는 모임 ${idx}`}
                  item={item}
                  db={db}
                />
              ))}
        </LocationMeetingCardBox>
       </LocationMeetingInnerSection2>
      </LocationMeetingArea>
    </>
  );
};

export default LocationMeeting;

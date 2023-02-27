import {
  MeetingCardBox,
  MeetingMoreBox,
  TechStackMeetingArea,
  MeetingTitleBox,
  TechStackMeetingTitle,
  NonRecommendText1,
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { MdExpandMore } from 'react-icons/md';
import { useQueries } from 'react-query';
import { getPost, getUser } from '../../../common/utils/getApi';
import { useEffect, useState } from 'react';
import { db } from '../../../common/firebase';

const TechStackMeeting = ({ isLoggedIn, recommendTechList }) => {
  // const [recommendTechList, setRecommendTechList] = useState([]);
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
  //     const newrecommendTechList = result[1]?.data?.filter((item) =>
  //       item.partyStack.includes(result[0]?.data[0]?.moreInfo.u_stack.toString()),
  //     );

  //     if (
  //       result[1]?.data?.length > 0 &&
  //       newrecommendTechList?.length > 0 &&
  //       recommendTechList?.length === 0
  //     ) {
  //       setRecommendTechList(newrecommendTechList);
  //     }
  //   }
  // }, [result, recommendTechList]);

  // console.log('recommendTechList', recommendTechList);
  return (
    <TechStackMeetingArea>
      <MeetingTitleBox>
        <TechStackMeetingTitle>기술 스택에 맞는 모임</TechStackMeetingTitle>
      </MeetingTitleBox>
      <MeetingCardBox>
        {recommendTechList.length === 0 ? (
          <NonRecommendText1>
            추천 모임이 없습니다.
            <br />
            추가 정보를 등록 or 수정해주세요!
          </NonRecommendText1>
        ) : (
          recommendTechList
            .slice(0, 4)
            .map((item, idx) => <CardSection key={idx} item={item} db={db} />)
        )}
      </MeetingCardBox>
    </TechStackMeetingArea>
  );
};

export default TechStackMeeting;

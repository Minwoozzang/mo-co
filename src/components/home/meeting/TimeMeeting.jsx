import {
  TimeMeetingArea,
  MeetingTitleBox,
  MeetingCardBox,
  TimeMeetingTitle,
  MeetingMoreBox,
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
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { MdExpandMore } from 'react-icons/md';
import { useQueries, useQuery } from 'react-query';
import { getPost, getUser } from '../../../common/utils/getApi';
import { useEffect, useState } from 'react';

const TimeMeeting = ({ recommendTimeList }) => {
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
    </TimeMeetingArea>
  );
};

export default TimeMeeting;

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
} from '../../homestyle/homemeeting';
import CardSection from '../../../shared/CardSection';
import { db } from '../../../common/firebase';
import { MdExpandMore } from 'react-icons/md';
import { useQueries } from 'react-query';
import { getPost, getUser } from '../../../common/utils/getApi';
import { useEffect, useState } from 'react';

const LocationMeeting = ({ recommendLocationList }) => {
  const titlestring1 = '{=';
  const titlestring2 = ';';
  const titlestring3 = '} * --- />';

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

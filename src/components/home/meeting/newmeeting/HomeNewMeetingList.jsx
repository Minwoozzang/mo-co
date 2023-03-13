import CardSection from '../../../../shared/CardSection';
import {
  NewMeetingArea,
  NewMeetingArrow,
  NewMeetingCardBox,
  NewMeetingCardWrap,
  NewMeetingListBox,
  NewMeetingTitle,
  NewMeetingTitleBox,
} from '../../../homestyle/homenewmeeting';
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { db } from '../../../../common/firebase';
import { useRecoilValue } from 'recoil';
import postState from '../../../../recoil/postState';
import { useMediaQuery } from 'react-responsive';

const HomeNewMeetingList = ({ uid, userBookmark }) => {
  // small screen
  const referenceSize = 1920;
  const isSmallScreen1 = useMediaQuery({
    query: `(min-width: 1860px)`,
  });
  const isSmallScreen2 = useMediaQuery({
    query: `(min-width: 1325px) and (max-width: 1860px)`,
  });
  const isSmallScreen3 = useMediaQuery({
    query: `(min-width: 880px) and (max-width: 1325px)`,
  });
  const isSmallScreen4 = useMediaQuery({
    query: `(max-width: 880px)`,
  });

  const postData = useRecoilValue(postState);

  return (
    <NewMeetingArea>
      <NewMeetingListBox>
        <NewMeetingTitleBox>
          <NewMeetingTitle>새로 생긴 모임</NewMeetingTitle>
        </NewMeetingTitleBox>
        <NewMeetingCardWrap>
          {/* <NewMeetingArrow>
            <AiOutlineArrowLeft size="36" />
          </NewMeetingArrow> */}
          <NewMeetingCardBox>
            {isSmallScreen1 && postData
              ? postData
                  .filter((item) => item.isDeleted === false)
                  .slice(0, 4)
                  .map((item, idx) => (
                    <CardSection key={idx} item={item} db={db} />
                  ))
              : []}
            {isSmallScreen2 && postData
              ? postData
                  .filter((item) => item.isDeleted === false)
                  .slice(0, 3)
                  .map((item, idx) => (
                    <CardSection key={idx} item={item} db={db} />
                  ))
              : []}
            {isSmallScreen3 && postData
              ? postData
                  .filter((item) => item.isDeleted === false)
                  .slice(0, 2)
                  .map((item, idx) => (
                    <CardSection key={idx} item={item} db={db} />
                  ))
              : []}
            {isSmallScreen4 && postData
              ? postData
                  .filter((item) => item.isDeleted === false)
                  .slice(0, 1)
                  .map((item, idx) => (
                    <CardSection key={idx} item={item} db={db} />
                  ))
              : []}
          </NewMeetingCardBox>
          {/* <NewMeetingArrow>
            <AiOutlineArrowRight size="36" />
          </NewMeetingArrow> */}
        </NewMeetingCardWrap>
      </NewMeetingListBox>
    </NewMeetingArea>
  );
};

export default HomeNewMeetingList;

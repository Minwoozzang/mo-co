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

const HomeNewMeetingList = ({ uid, userBookmark }) => {
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
            {postData
              ? postData
                  .slice(0, 4)
                  .map((item, idx) => (
                    <CardSection
                      key={idx}
                      item={item}
                      db={db}
                    />
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

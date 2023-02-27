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
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { db } from '../../../../common/firebase';

const HomeNewMeetingList = ({ data, uid, userBookmark }) => {
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
            {data
              ? data
                  .slice(0, 4)
                  .map((item) => (
                    <CardSection
                      key={item.id}
                      item={item}
                      db={db}
                      uid={uid}
                      userBookmark={userBookmark}
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

import React, { useEffect, useState } from 'react';
import { Replybutton } from '../comment/CommentStyle';
import { ReplyWrap } from './replyCommentStyle';
import CommentTest from './commentTest';
import ReplyAddComment from './../replyAddComment/replyAddComment';
import ReplyComment from './replyComment';

const ReplyCommentList = ({ user }) => {
  const [display, setDisplay] = useState(false);

  console.log(user.replyComment);
  return (
    <ReplyWrap>
      <Replybutton
        onClick={() => {
          setDisplay(!display);
        }}
      >
        답글 쓰기
      </Replybutton>
      {/* user.replycomment map돌리기 */}
      {/* <ReplyComment /> */}
      {display &&
        display.map((user) => {
          return <ReplyComment user={user.replyComment} />;
        })}
      ;
    </ReplyWrap>
  );
};

export default ReplyCommentList;

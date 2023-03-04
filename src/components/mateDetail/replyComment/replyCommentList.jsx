import React, { useEffect, useState } from 'react';
import { Replybutton } from '../comment/CommentStyle';
import { ReplyWrap } from './replyCommentStyle';
import CommentTest from './commentTest';
import ReplyAddComment from './../replyAddComment/replyAddComment';
import ReplyComment from './replyComment';

const ReplyCommentList = ({ user }) => {
  const [display, setDisplay] = useState(false);

  console.log(user);
  return (
    <ReplyWrap>
      <Replybutton
        onClick={() => {
          setDisplay(!display);
        }}
      >
        답글 쓰기
      </Replybutton>
      {display && <ReplyAddComment />}
      {display &&
        user?.replyComment.map((comment) => {
          return <ReplyComment user={comment} />;
        })}
      ;
    </ReplyWrap>
  );
};

export default ReplyCommentList;

{
  /* {display &&
        user?.replyComment.map((user) => {
          return <ReplyComment user={user.replyComment} />;
        })} */
}

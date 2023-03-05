import React, { useEffect, useState } from 'react';
import { Replybutton } from '../comment/CommentStyle';
import { ReplyWrap } from './replyCommentStyle';
import CommentTest from './commentTest';
import ReplyAddComment from './../replyAddComment/replyAddComment';
import ReplyComment from './replyComment';

const ReplyCommentList = ({ comment }) => {
  const [display, setDisplay] = useState(false);

  console.log(comment);
  return (
    <ReplyWrap>
      <Replybutton
        onClick={() => {
          setDisplay(!display);
        }}
      >
        답글 쓰기
      </Replybutton>
      {display && <ReplyAddComment comment={comment} />}
      {comment?.replyComment.map((comment) => {
        return <ReplyComment comment={comment} />;
      })}
      ;
    </ReplyWrap>
  );
};

export default ReplyCommentList;

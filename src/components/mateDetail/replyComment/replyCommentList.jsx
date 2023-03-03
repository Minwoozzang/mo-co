import React, { useEffect, useState } from 'react';
import { Replybutton } from '../comment/CommentStyle';
import { ReplyWrap } from './replyCommentStyle';
import CommentTest from './commentTest';
import ReplyAddComment from './../replyAddComment/replyAddComment';
import ReplyComment from './replyComment';

const ReplyCommentList = (user) => {
  const [display, setDisplay] = useState(false);

  return (
    <ReplyWrap>
      <Replybutton
        onClick={() => {
          setDisplay(!display);
        }}
      >
        답글 쓰기
      </Replybutton>
      <CommentTest />
      {/* <ReplyComment /> */}
      {display && <ReplyAddComment />};
    </ReplyWrap>
  );
};

export default ReplyCommentList;

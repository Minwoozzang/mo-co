import React, { useEffect, useState } from 'react';
import { Replybutton } from '../comment/CommentStyle';
import { ReplyWrap } from './replyCommentStyle';
import CommentTest from './commentTest';
import ReplyComment from './replyComment';
import ReplyAddComment from '../replyAddComment/replyAddComment';
import AddComment from './../addComment/AddComment';

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
      <ReplyComment />
      {display && <AddComment />};
    </ReplyWrap>
  );
};

export default ReplyCommentList;

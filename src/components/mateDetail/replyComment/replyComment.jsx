import React, { useEffect, useState } from 'react';
import { Replybutton } from './../comment/CommentStyle';
import { ReplyWrap } from './replyCommentStyle';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './../../../common/firebase';
import Comment from '../comment/Comment';
import AddComment from './../addComment/AddComment';
import CommentTest from './commentTest';

const ReplyComment = (user) => {
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
      {display && <AddComment />};
    </ReplyWrap>
  );
};

export default ReplyComment;

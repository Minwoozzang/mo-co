import React, { useEffect, useState } from 'react';
import { Replybutton } from '../comment/CommentStyle';
import { ReplyWrap } from './replyCommentStyle';
import ReplyAddComment from '../replyAddComment/replyAddComment';
import ReplyComment from './replyComment';

const ReplyCommentList = ({ comment }) => {
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
      {display ? (
        <ReplyAddComment comment={comment} setDisplay={setDisplay} />
      ) : null}
      {comment?.replyComment.map((item, index) => {
        return <ReplyComment comment={item} index={index} comments={comment} />;
      })}
      ;
    </ReplyWrap>
  );
};

export default ReplyCommentList;

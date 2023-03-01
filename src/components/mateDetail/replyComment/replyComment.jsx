import React from 'react';
import { Replybutton } from './../comment/CommentStyle';

const ReplyComment = () => {
  // 대댓글 추가
  const commentSubmit = (e) => {
    e.preventDefault();
  };

  return <Replybutton onClick={commentSubmit}>답글쓰기</Replybutton>;
};

export default ReplyComment;

import React, { useState } from 'react';
import { Replybutton } from './../comment/CommentStyle';

const ReplyComment = (user) => {
  const [display, setDisplay] = useState(false);
  // 대댓글 추가
  const commentSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Replybutton
        onClick={() => {
          setDisplay(!display);
        }}
      ></Replybutton>

      {display && <></>}
    </>
  );
};

export default ReplyComment;

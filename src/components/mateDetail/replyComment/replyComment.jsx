import React from 'react';

import default_profile from '../../../assets/icon/user.png';
import {
  CommentContainer,
  CommentDeleteBtn,
  CommentIconBody,
  CommentUserName,
  CommentUserInput,
  CommentText,
  CommentTextIcon,
  CommentUpdateBtn,
  ListContainer,
  ListTextSection,
  NoneDiv,
  UpdateDeleteBody,
  CommentProfileImage,
  CommentDate,
  UserHr,
} from './../comment/CommentStyle';

const ReplyComment = () => {
  return (
    <CommentContainer>
      {/* 댓글 내용 */}
      <ListContainer>
        <ListTextSection>
          <CommentProfileImage src={default_profile}></CommentProfileImage>
          <CommentUserName>asdasd</CommentUserName>
          <CommentIconBody>
            <GrMoreVertical
              style={{
                color: '#858585',
                width: '550px',
              }}
            />
          </CommentIconBody>

          <CommentText>asdasdasdasdad</CommentText>

          <CommentDate>23.3.02</CommentDate>
        </ListTextSection>
      </ListContainer>
      <UserHr />
    </CommentContainer>
  );
};

export default ReplyComment;

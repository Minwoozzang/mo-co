import React from 'react';
import {
  MessageSection,
  MessageImageBox,
  MessageImage,
  MessageTextBox,
  MessageNickName,
  MessageContent,
} from './messageBoxStyle';

const MessageBox = ({ t }) => {
  return (
    <MessageSection>
      <MessageImageBox>
        <MessageImage src={t.profileImg} alt="" />
      </MessageImageBox>
      <MessageTextBox>
        <MessageNickName>{t.nickName}</MessageNickName>
        <MessageContent>{t.comment}</MessageContent>
      </MessageTextBox>
    </MessageSection>
  );
};

export default MessageBox;

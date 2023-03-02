import React from 'react';
import { authService } from '../../../common/firebase';
import {
  MessageSection,
  MessageImageBox,
  MessageImage,
  MessageTextBox,
  MessageNickName,
  MessageContent,
  MyMessageSection,
  MyMessageImageBox,
  MyMessageImage,
  MyMessageTextBox,
  MyMessageNickName,
  MyMessageContent,
} from './messageBoxStyle';

const MessageBox = ({ t }) => {
  const myChat = t.filter((a) => a.uid === authService.currentUser.uid);

  const otherChat = t.filter((a) => a.uid !== authService.currentUser.uid);

  return (
    <>
      {otherChat.map((data) => {
        return (
          <MessageSection>
            <MessageImageBox>
              <MessageImage src={data.profileImg} alt="" />
            </MessageImageBox>
            <MessageTextBox>
              <MessageNickName>{data.nickName}</MessageNickName>
              <MessageContent>{data.comment}</MessageContent>
            </MessageTextBox>
          </MessageSection>
        );
      })}
      {myChat.map((data) => {
        return (
          <MyMessageSection>
            <MyMessageTextBox>
              <MyMessageNickName>{data.nickName}</MyMessageNickName>
              <MyMessageContent>{data.comment}</MyMessageContent>
            </MyMessageTextBox>
            <MyMessageImageBox>
              <MyMessageImage src={data.profileImg} />
            </MyMessageImageBox>
          </MyMessageSection>
        );
      })}
    </>
  );
};

export default MessageBox;

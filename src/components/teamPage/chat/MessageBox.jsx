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
import { v4 } from 'uuid';

const MessageBox = ({ t }) => {
  return (
    <>
      {t.map((data) => {
        return (
          <div>
            {data.uid !== authService.currentUser.uid ? (
              <>
                <MessageSection key={v4()}>
                  <MessageImageBox>
                    <MessageImage src={data.profileImg} alt="" />
                  </MessageImageBox>
                  <MessageTextBox>
                    <MessageNickName>{data.nickName}</MessageNickName>
                    <MessageContent>{data.comment}</MessageContent>
                  </MessageTextBox>
                </MessageSection>
              </>
            ) : (
              <>
                {' '}
                <MyMessageSection key={v4()}>
                  <MyMessageTextBox>
                    <MyMessageNickName>{data.nickName}</MyMessageNickName>
                    <MyMessageContent>{data.comment}</MyMessageContent>
                  </MyMessageTextBox>
                  <MyMessageImageBox>
                    <MyMessageImage src={data.profileImg} />
                  </MyMessageImageBox>
                </MyMessageSection>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default MessageBox;

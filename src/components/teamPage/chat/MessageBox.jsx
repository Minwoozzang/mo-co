import React, { useEffect, useRef } from 'react';
import { authService } from '../../../common/firebase';
import {
  MessageSectionBox,
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
  // 스크롤 Ref
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <MessageSectionBox>
      {t.map((data) => {
        return (
          <div key={v4()}>
            {data.uid !== authService.currentUser.uid ? (
              <>
                <MessageSection>
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
                <MyMessageSection>
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
      <div ref={scrollRef} />
    </MessageSectionBox>
  );
};

export default MessageBox;

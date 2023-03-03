import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { doc, updateDoc } from 'firebase/firestore';
import { db, authService } from '../../../common/firebase';
import CustomUi from './CustomUi';
import { GrMoreVertical } from 'react-icons/gr';
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
} from './CommentStyle';
import default_profile from '../../../assets/icon/user.png';
import ReplyComment from '../replyComment/replyCommentList';

const Comment = ({ user }) => {
  // comment 컬렉션 데이터 저장

  const [editBox, setEditBox] = useState(false);
  const [editValue, setEditValue] = useState(user.comment);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [areYouUser, setAreYouUser] = useState(false);

  //console.log(img);
  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  // 토글 버튼을 누를 시 userid와 currentuid비교
  // 수정 삭제 버튼 오픈
  const ToggleDropDown = (userId) => {
    const currentUid = authService?.currentUser?.uid;

    if (toggleBtn === false) {
      if (userId === currentUid) {
        setAreYouUser(true);
      }
      setToggleBtn(true);
    } else if (toggleBtn === true) {
      if (userId === currentUid) {
        setAreYouUser(false);
      }
      setToggleBtn(false);
    }
  };

  // 댓글 수정
  const editHandler = (comment) => {
    setEditValue(comment);
    setEditBox(true);
  };

  // 댓글 수정완료
  const completeHandler = async (user, comment) => {
    setEditBox(false);
    await updateDoc(doc(db, 'comment', user.id), { comment: comment });
    setToggleBtn(false);
  };

  // 댓글 삭제
  const deleteHandler = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return <CustomUi onClose={onClose} id={id} />;
      },
    });
  };

  return (
    <CommentContainer>
      {/* 댓글 내용 */}
      <ListContainer>
        <ListTextSection>
          <CommentProfileImage
            src={!user.userImg ? default_profile : user.userImg}
          ></CommentProfileImage>
          <CommentUserName>{user.userName}</CommentUserName>
          <CommentIconBody>
            <GrMoreVertical
              style={{
                color: '#858585',
                width: '550px',
              }}
              onClick={() => ToggleDropDown(user.userId)}
            />
            <CommentTextIcon>
              {toggleBtn ? (
                <>
                  {areYouUser ? (
                    <UpdateDeleteBody>
                      {!editBox ? (
                        <CommentUpdateBtn
                          onClick={() => {
                            editHandler(user.comment);
                          }}
                        >
                          수정
                        </CommentUpdateBtn>
                      ) : (
                        <CommentUpdateBtn
                          onClick={() =>
                            completeHandler(user, editValue, user.uid)
                          }
                        >
                          수정완료
                        </CommentUpdateBtn>
                      )}

                      <CommentDeleteBtn
                        onClick={() => {
                          deleteHandler(user.id);
                        }}
                        user={user}
                      >
                        삭제
                      </CommentDeleteBtn>
                    </UpdateDeleteBody>
                  ) : (
                    <UpdateDeleteBody></UpdateDeleteBody>
                  )}
                </>
              ) : (
                <NoneDiv></NoneDiv>
              )}
            </CommentTextIcon>
          </CommentIconBody>
          {!editBox ? (
            <CommentText>{user.comment}</CommentText>
          ) : (
            <CommentUserInput
              type="text"
              value={editValue}
              onChange={(e) => handleChange(e)}
            />
          )}
          <CommentDate>{user.date}</CommentDate>

          <ReplyComment user={user} />
        </ListTextSection>
      </ListContainer>
      <UserHr />
    </CommentContainer>
  );
};

export default Comment;

import { updateDoc, doc } from 'firebase/firestore';
import styled from '@emotion/styled';
import { db } from '../../../common/firebase';

const ReplyCustomUi = ({ comment, id, onClose }) => {

  const deleteHandler = async () => {
    const newComment = comment.replyComment.filter((x) => x.commentId !== id);
    const hideComment = doc(db, 'comment', comment.id);
    await updateDoc(hideComment, { replyComment: newComment });

    onClose();
  };

  return (
    <ConfirmBody>
      <ConfirmBox>
        <TitleBox>
          <ConfirmTitle>댓글 삭제</ConfirmTitle>
        </TitleBox>
        <TextBox>
          <ConfirmText>댓글을 완전히 삭제할까요?</ConfirmText>
        </TextBox>
        <BtnBox>
          <ConfirmCancelBtn onClick={onClose}>취소</ConfirmCancelBtn>
          <ConfirmDeleteBtn onClick={() => deleteHandler()}>
            삭제
          </ConfirmDeleteBtn>
        </BtnBox>
      </ConfirmBox>
    </ConfirmBody>
  );
};
export default ReplyCustomUi;

const ConfirmBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ConfirmBox = styled.div`
  width: 350px;
  height: 200px;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  bottom: 80px;
  padding-top: 40px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmTitle = styled.h2``;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmText = styled.p`
  margin-top: 10px;
`;

const BtnBox = styled.div`
  margin-top: 7%;
  display: flex;
  justify-content: center;
  gap: 15px;
`;
const ConfirmCancelBtn = styled.button`
  font-size: 16px;
  font-weight: 800;

  background: none;
  border: none;
  cursor: pointer;
`;

const ConfirmDeleteBtn = styled(ConfirmCancelBtn)``;

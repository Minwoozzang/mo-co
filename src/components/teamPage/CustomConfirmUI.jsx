import styled from '@emotion/styled';
import { doc, updateDoc } from 'firebase/firestore';
import { IoMdClose } from 'react-icons/io';
import { db } from '../../common/firebase';

const CustomConfirmUI = (props) => {
  console.log(props.data.uid);
  const updateIsWait = (uid) => {
    console.log('uid', uid);
    updateDoc(doc(db, 'teamPage', props.id), {});

    props.onClose();
  };

  return (
    <ConfirmBody>
      <ConfirmBox>
        <TitleBox>
          {/* <ConfirmTitle>참여신청</ConfirmTitle> */}
          <IoMdClose
            onClick={props.onClose}
            style={{ fontSize: '25px', marginRight: '10px', cursor: 'pointer' }}
          />
        </TitleBox>
        <MessageBox>{props.data.joinMessage}</MessageBox>
        <TextBox>
          <ConfirmText>
            {props.data.nickName} 님을 수락하시겠습니까?
          </ConfirmText>
        </TextBox>
        <BtnBox>
          <ConfirmCancelBtn onClick={props.onClose}>거절</ConfirmCancelBtn>
          <ConfirmDeleteBtn onClick={() => updateIsWait(props.data.uid)}>
            수락
          </ConfirmDeleteBtn>
        </BtnBox>
      </ConfirmBox>
    </ConfirmBody>
  );
};
export default CustomConfirmUI;

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
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 10px;
`;

const ConfirmTitle = styled.div`
  font-size: 20px;

  margin-right: 105px;
`;

const MessageBox = styled.div`
  width: 100%;
  text-align: center;

  font-size: 23px;

  margin-top: 20px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 35px;
`;

const ConfirmText = styled.p`
  font-size: 20px;
  font-weight: 550;
`;

const BtnBox = styled.div`
  margin-top: 20px;
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

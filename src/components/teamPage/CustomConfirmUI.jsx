import styled from '@emotion/styled';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { authService, db } from '../../common/firebase';
import cancel from '../../../src/assets/icon/Icon_cancel.png';

const CustomConfirmUI = (props) => {
  // 본인 아이디
  const myId = props.data.uid;
  const myInfo = props.data;
  // 팀 ID
  const teamID = props.id;
  //  팀 멤버
  const member = props.item;
  const otherMember = member.filter((d) => d.uid !== myId);

  // 해당 유저 컬렉션에 팀 ID에 접근하기
  const [userTeamID, setUserTeamID] = useState([]);
  const getUserTeamID = () => {
    const q = query(collection(db, 'user'), where('uid', '==', myId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTeamID(newInfo[0]?.teamID.filter((a) => a !== teamID));
    });

    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        getUserTeamID();
      }
    });
  }, []);

  // 수락할 경우
  const updateIsWait = () => {
    updateDoc(doc(db, 'teamPage', props.id), {
      teamMember: [
        ...otherMember,
        {
          isWait: false,
          joinMessage: myInfo.joinMessage,
          nickName: myInfo.nickName,
          profileImg: myInfo.profileImg,
          teamPositon: myInfo.teamPositon,
          uid: myInfo.uid,
        },
      ],
    });

    props.onClose();
  };

  // 거절할 경우
  async function rejectSuggestion(uid) {
    await updateDoc(doc(db, 'user', uid), {
      teamID: [...userTeamID],
    });
    await updateDoc(doc(db, 'teamPage', props.id), {
      teamMember: [...otherMember],
    });
    props.onClose();
  }
  return (
    <ConfirmBody>
      <ConfirmBox>
        <TitleBox>
          <CancelImg src={cancel} onClick={props.onClose} />
        </TitleBox>
        <MessageBox>{props.data.joinMessage}</MessageBox>
        <TextBox>
          <ConfirmText>
            {props.data.nickName} 님을 수락하시겠습니까?
          </ConfirmText>
        </TextBox>
        <BtnBox>
          <ConfirmCancelBtn onClick={() => rejectSuggestion(props.data.uid)}>
            거절
          </ConfirmCancelBtn>
          <ConfirmDeleteBtn onClick={updateIsWait}>수락</ConfirmDeleteBtn>
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
  width: 400px;
  height: 480px;

  background: #232323;
  border-radius: 20px;

  position: relative;
  bottom: 80px;
`;

const CancelImg = styled.img`
  width: 20px;
  height: 20px;

  margin-right: 15px;

  cursor: pointer;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 15px;
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

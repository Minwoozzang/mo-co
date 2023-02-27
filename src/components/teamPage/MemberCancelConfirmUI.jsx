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

const MemberCancelConfirmUI = (props) => {
  // 본인 아이디
  const myId = props.data.uid;
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
        <TextBox>
          <ConfirmText>
            {props.data.nickName} 님을 퇴장 시키시겠습니까?
          </ConfirmText>
        </TextBox>
        <BtnBox>
          <ConfirmCancelBtn onClick={props.onClose}>취소</ConfirmCancelBtn>
          <ConfirmDeleteBtn onClick={() => rejectSuggestion(props.data.uid)}>
            퇴장
          </ConfirmDeleteBtn>
        </BtnBox>
      </ConfirmBox>
    </ConfirmBody>
  );
};

export default MemberCancelConfirmUI;

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

const TextBox = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 45px;
`;

const ConfirmText = styled.p`
  font-size: 20px;
  font-weight: 550;
`;

const BtnBox = styled.div`
  margin-top: 60px;
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

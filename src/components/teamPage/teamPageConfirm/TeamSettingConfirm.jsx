import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { authService, db } from '../../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TeamSettingConfirm = (props) => {
  // 모임 폭파하기
  const leaderCancelHandler = async () => {
    try {
      await deleteDoc(doc(db, 'teamPage', props.teamLocationID));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SettingBody>
      <SettingBoX>
        <Title>
          '{props.title}' <br /> 모임을 {props.cancel}하시겠습니까?
        </Title>
        <BtnBox>
          <CloseBtn onClick={() => props.onClose()}>취소</CloseBtn>

          <CancelBtn onClick={leaderCancelHandler}>
            {props.cancel}하기
          </CancelBtn>
        </BtnBox>
      </SettingBoX>
    </SettingBody>
  );
};

export default TeamSettingConfirm;

const SettingBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 990;
`;
const SettingBoX = styled.div`
  width: 400px;
  height: 195px;

  background: #232323;
  border-radius: 20px;
`;
const Title = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 21px;

  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;

  margin-top: 40px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;

  gap: 10px;

  margin-top: 32px;
`;
const CloseBtn = styled.div`
  width: 159px;
  height: 44px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 550;
  font-size: 1rem;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  border-radius: 5px;

  cursor: pointer;
`;
const CancelBtn = styled(CloseBtn)`
  color: #ffffff;

  background: #545454;
`;

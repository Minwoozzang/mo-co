import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authService, db } from '../../common/firebase';
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  onSnapshot,
  where,
} from 'firebase/firestore';
import styled from '@emotion/styled';
import TeamPlaceModal from '../../components/teamPage/TeamPlaceModal';

export default function TeamPlace() {
  const [place, setPlace] = useState([]);
  const [convert, setConvert] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  // post에서 uid 받아오기
  const [idUid, setidUid] = useState([]);
  const postGetTeamID = () => {
    const q = query(
      collection(db, 'post'),
      where('uid', '==', authService.currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setidUid(newInfo[0]?.uid);
    });
    return unsubscribe;
  };

  // 팀 아이디 받아오기
  const [teamID, setTeamID] = useState([]);
  const teamGetTeamID = () => {
    const q = query(collection(db, 'teamPage'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamID(newInfo[0]?.id);
      setPlace(newInfo[0]?.contentPlace);
    });
    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setCurrentUserId(authService.currentUser.uid);
        teamGetTeamID();
        postGetTeamID();
      }
    });
  }, []);

  const isOwner = idUid === currentUserId ? true : false;

  const convertChange = () => {
    setConvert(!convert);
  };
  const updateContentPlace = async () => {
    if (convert) {
      const newContentField = {
        contentPlace: addressDetail,
      };
      try {
        await updateDoc(doc(db, 'teamPage', teamID), newContentField);
      } catch (e) {
        console.log(e);
      } finally {
        console.log('end');
      }
    }
    convertChange();
    // window.location.reload();
  };

  const [modal, setModal] = useState(false);

  // const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소

  // const currentUrl = window.location.href;

  // const open = useDaumPostcodePopup(currentUrl);

  // const handleComplete = (data) => {
  //   let fullAddress = data.address;
  //   let extraAddress = '';

  //   if (data.addressType === 'R') {
  //     if (data.bname !== '') {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== '') {
  //       extraAddress +=
  //         extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
  //   }

  //   setAddressDetail(fullAddress);

  //   // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  // };

  // const handleClick = () => {
  //   open({ onComplete: handleComplete });
  // };

  return (
    <>
      <ButtonPlaceTitleWrap>
        <ContentTitle>📌 모임 공지</ContentTitle>
        {isOwner && (
          <>
            <SubmitBtn onClick={updateContentPlace} type="submit">
              작성
            </SubmitBtn>
          </>
        )}
      </ButtonPlaceTitleWrap>
      <TextAreaWrapper>
        {convert ? (
          <>
            <ContentCard>
              <PlaceBtn
                onClick={() => {
                  setModal(!modal);
                }}
              >
                주소를 등록해주세요!
              </PlaceBtn>
              {modal == true ? (
                <TeamPlaceModal
                  modal={modal}
                  onClose={() => {
                    setModal(false);
                  }}
                />
              ) : null}
            </ContentCard>
          </>
        ) : (
          <ContentCard>
            <p>{place}</p>
          </ContentCard>
        )}
      </TextAreaWrapper>
    </>
  );
}

const ButtonPlaceTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ContentTitle = styled.a`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 20px;
  margin-top: 20px;
`;

const SubmitBtn = styled.button`
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  width: 50px;
  height: 30px;
  text-align: center;
  align-items: center;
  font-size: 15px;
  border: none;
  background-color: transparent;
  color: grey;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .text {
    width: 100%;
    height: 200px;
  }
`;

const ContentCard = styled.div`
  width: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.4s;
  height: 20vh;
  background-color: whitesmoke;
  button,
  p {
    padding: 20px;
  }
`;

const PlaceBtn = styled.button`
  width: 170px;
  height: 30px;
  text-align: center;
  align-items: center;
  font-size: 15px;
  border: none;
  background-color: transparent;
  color: grey;
`;

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
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { v4 } from 'uuid';

export default function TeamPlace({ teamLocationID }) {
  const [place, setPlace] = useState([]);
  const [convert, setConvert] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [address, setAddress] = useState('주소를 등록해주세요!'); // 주소
  const [placeName, setPlaceName] = useState('');
  const [placeX, setPlaceX] = useState(33.450701);
  const [placeY, setPlaceY] = useState(126.570667);

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
    const teamPageCollectionRef = collection(db, 'teamPage');
    const q = query(teamPageCollectionRef);
    const getTeamPage = onSnapshot(q, (snapshot) => {
      const teamPageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamPage(teamPageData);
    });
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setCurrentUserId(authService.currentUser.uid);
        teamGetTeamID();
        postGetTeamID();
      }
    });
    return getTeamPage;
  }, []);

  const isOwner = idUid === currentUserId ? true : false;

  const convertChange = () => {
    setConvert(!convert);
  };
  const updateContentPlace = async () => {
    if (convert) {
      const newContentField = {
        contentPlaceName: address,
        contentPlaceAddress: placeName,
        contentLat: placeY,
        contentLng: placeX,
      };
      try {
        await updateDoc(doc(db, 'teamPage', teamLocationID), newContentField);
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

  const [teamPage, setTeamPage] = useState([]);

  return (
    <>
      <TextAreaWrapper>
        {convert ? (
          <>
            <ContentCard>
              <ButtonPlaceTitleWrap>
                <ContentTitle>모임 장소</ContentTitle>
                {isOwner && (
                  <>
                    <SubmitBtn onClick={updateContentPlace} type="submit">
                      작성
                    </SubmitBtn>
                  </>
                )}
              </ButtonPlaceTitleWrap>
              <PlaceWrap>
                <Map // 지도를 표시할 Container
                  center={{
                    // 지도의 중심좌표
                    lat: placeY,
                    lng: placeX,
                  }}
                  style={{
                    // 지도의 크기
                    width: '50%',
                    height: '21vh',
                  }}
                  level={4} // 지도의 확대 레벨
                >
                  <MapMarker // 마커를 생성합니다
                    position={{
                      // 마커가 표시될 위치입니다
                      lat: placeY,
                      lng: placeX,
                    }}
                  />
                </Map>
                <PlaceTextWrap>
                  <PlaceBtn
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    {address}
                  </PlaceBtn>
                  <div>{placeName}</div>
                </PlaceTextWrap>
              </PlaceWrap>
              {modal === true ? (
                <TeamPlaceModal
                  modal={modal}
                  onClose={() => {
                    setModal(false);
                  }}
                  setAddress={setAddress}
                  setPlaceName={setPlaceName}
                  setPlaceX={setPlaceX}
                  setPlaceY={setPlaceY}
                />
              ) : null}
            </ContentCard>
          </>
        ) : (
          <ContentCard>
            <ButtonPlaceTitleWrap>
              <ContentTitle>모임 장소</ContentTitle>
              {isOwner && (
                <>
                  <SubmitBtn onClick={updateContentPlace} type="submit">
                    작성
                  </SubmitBtn>
                </>
              )}
            </ButtonPlaceTitleWrap>
            <PlaceWrap>
              {teamPage
                .filter((item) => item.id === teamLocationID)
                .map((item) => {
                  return (
                    <>
                      <Map
                        key={v4()} // 지도를 표시할 Container
                        center={{
                          // 지도의 중심좌표
                          lat: item.contentLat,
                          lng: item.contentLng,
                        }}
                        style={{
                          // 지도의 크기
                          width: '50%',
                          height: '21vh',
                        }}
                        level={4} // 지도의 확대 레벨
                      >
                        <MapMarker // 마커를 생성합니다
                          position={{
                            // 마커가 표시될 위치입니다
                            lat: item.contentLat,
                            lng: item.contentLng,
                          }}
                        />
                      </Map>
                      <PlaceTextWrap>
                        <PlaceBtn>{item.contentPlaceName}</PlaceBtn>
                        <div>{item.contentPlaceAddress}</div>
                      </PlaceTextWrap>
                    </>
                  );
                })}
            </PlaceWrap>
          </ContentCard>
        )}
      </TextAreaWrapper>
    </>
  );
}

const ButtonPlaceTitleWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #232323;
`;

const ContentTitle = styled.a`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  color: white;
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
  height: 25vh;
  background-color: white;
  margin-top: 25px;
`;

const PlaceBtn = styled.div`
  width: 100%;
  height: 10px;
  align-items: center;
  font-size: 15px;
  margin-top: 10px;
  border: none;
  background-color: transparent;
  color: grey;
`;

const PlaceWrap = styled.div`
  display: flex;
`;

const PlaceTextWrap = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  div {
    padding: 20px;
  }
`;

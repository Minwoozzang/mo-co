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
import { useRecoilState } from 'recoil';
import teamPageState from '../../recoil/teamPageState';
import { useQueryClient } from 'react-query';

export default function TeamPlace({ teamLocationID }) {
  const queryClient = useQueryClient();

  // const [place, setPlace] = useState([]);
  const [convert, setConvert] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [address, setAddress] = useState('주소를 등록해주세요!'); // 주소
  const [placeName, setPlaceName] = useState('');
  const [placeX, setPlaceX] = useState(33.450701);
  const [placeY, setPlaceY] = useState(126.570667);

  const [teamPage, setTeamPage] = useRecoilState(teamPageState);

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

  useEffect(() => {
    // const teamPageCollectionRef = collection(db, 'teamPage');
    // const q = query(teamPageCollectionRef);
    // const getTeamPage = onSnapshot(q, (snapshot) => {
    //   const teamPageData = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   setTeamPage(teamPageData);
    // });
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setCurrentUserId(authService.currentUser.uid);
        postGetTeamID();
      }
    });
    // return getTeamPage;
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
        queryClient.invalidateQueries('teamPage');
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
                    width: '150px',
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
                  <PlaceBtn>{placeName}</PlaceBtn>
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
                ?.filter((item) => item.id === teamLocationID)
                .map((item) => {
                  return (
                    <PlaceWrapContainer key={v4()}>
                      <Map
                        // 지도를 표시할 Container
                        center={{
                          // 지도의 중심좌표
                          lat: item.contentLat,
                          lng: item.contentLng,
                        }}
                        style={{
                          // 지도의 크기
                          width: '150px',
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
                        <PlaceName>{item.contentPlaceName}</PlaceName>
                        <PlaceName>{item.contentPlaceAddress}</PlaceName>
                      </PlaceTextWrap>
                    </PlaceWrapContainer>
                  );
                })}
            </PlaceWrap>
          </ContentCard>
        )}
      </TextAreaWrapper>
    </>
  );
}

const PlaceWrapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

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
  width: 300px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.4s;
  height: 200px;
  background-color: white;
  margin-top: 25px;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-height: 800px) {
    width: 300px;
    height: 150px;
  }
`;

const PlaceBtn = styled.div`
  width: 180px;
  height: 10px;
  align-items: center;
  font-size: 15px;
  margin-top: 10px;
  border: none;
  background-color: transparent;
  color: grey;
`;

const PlaceName = styled.div`
  width: 180px;
  height: 10px;
  align-items: center;
  font-size: 15px;
  margin-top: 10px;
  color: black;
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

  @media screen and (max-height: 800px) {
    div {
      padding: 10px;
    }
  }
`;

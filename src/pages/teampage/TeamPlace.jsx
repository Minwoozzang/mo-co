import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { getAuth } from 'firebase/auth';
import { db } from '../../common/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import styled from '@emotion/styled';
import TeamPlaceModal from '../../components/teamPage/TeamPlaceModal';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function TeamPlace() {
  const { id } = useParams();
  const [place, setPlace] = useState('');
  const [convert, setConvert] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [idUid, setidUid] = useState([]);
  const [address, setAddress] = useState('주소를 등록해주세요!'); // 주소
  const [placeName, setPlaceName] = useState('');
  const [placeX, setPlaceX] = useState(33.450701);
  const [placeY, setPlaceY] = useState(126.570667);

  const postDoc = doc(db, 'post', id);

  const Data = async () => {
    const docSnap = await getDoc(postDoc);
    const classData = docSnap.data();
    setidUid(classData.uid);
    if (classData.contentPlace) setPlace(classData.contentPlace);
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser.uid;
    setCurrentUserId(user);
    console.log('user', user);
    Data();
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
      };
      try {
        await updateDoc(postDoc, newContentField);
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
              <PlaceWrap>
                <Map // 지도를 표시할 Container
                  center={{
                    // 지도의 중심좌표
                    lat: placeX,
                    lng: placeY,
                  }}
                  style={{
                    // 지도의 크기
                    width: '50%',
                    height: '15vh',
                  }}
                  level={4} // 지도의 확대 레벨
                >
                  <MapMarker // 마커를 생성합니다
                    position={{
                      // 마커가 표시될 위치입니다
                      lat: placeX,
                      lng: placeY,
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
              {modal == true ? (
                <TeamPlaceModal
                  modal={modal}
                  onClose={() => {
                    setModal(false);
                  }}
                  setAddress={setAddress}
                  setPlaceName={setPlaceName}
                />
              ) : null}
            </ContentCard>
          </>
        ) : (
          <ContentCard>
            <PlaceWrap>
              <Map // 지도를 표시할 Container
                center={{
                  // 지도의 중심좌표
                  lat: placeX,
                  lng: placeY,
                }}
                style={{
                  // 지도의 크기
                  width: '50%',
                  height: '15vh',
                }}
                level={4} // 지도의 확대 레벨
              >
                <MapMarker // 마커를 생성합니다
                  position={{
                    // 마커가 표시될 위치입니다
                    lat: placeX,
                    lng: placeY,
                  }}
                />
              </Map>
              <PlaceTextWrap>
                <PlaceBtn>{address}</PlaceBtn>
                <div>{placeName}</div>
              </PlaceTextWrap>
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
  padding: 20px;
`;

const PlaceBtn = styled.div`
  width: 100%;
  height: 10px;
  align-items: center;
  font-size: 15px;
  border: none;
  background-color: transparent;
  color: grey;
`;

const PlaceWrap = styled.div`
  display: flex;
`;

const PlaceTextWrap = styled.div`
  width: 150px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  div {
    padding: 20px 10px;
  }
`;

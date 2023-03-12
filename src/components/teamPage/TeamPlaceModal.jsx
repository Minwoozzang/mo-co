import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { uuidv4 } from '@firebase/util';
import { IoCloseOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

export default function TeamPlaceModal({
  setAddress,
  setPlaceName,
  setPlaceX,
  setPlaceY,
  onClose,
}) {
  const [word, setWord] = useState('');
  const [resultData, setResultData] = useState([]);

  const handleClose = () => {
    onClose();
  };

  const onChangeSearch = (event) => {
    setWord(event.target.value);
  };

  const REST_API_KEY = '61b0fbfe80a8605ba2010ea70c5ac88b';

  const handleComplete = () => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?&radius=20000&query=${word}`,
        { headers: { Authorization: `KakaoAK ${REST_API_KEY}` } },
      )
      .then((res) => {
        setResultData(res.data.documents);
      })
      .catch(() => {
        toast.warn('다시 시도해주세요');
      });
  };

  const handlePlace = (name, address, coordinateX, coordinateY) => {
    setAddress(name);
    setPlaceName(address);
    setPlaceX(coordinateX);
    setPlaceY(coordinateY);
    onClose();
  };

  return (
    <>
      <WholeWrap>
        <PlaceModal>
          <ModalChang>
            <ButtonPlaceTitleWrap>
              <ContentTitle>모임 장소 등록</ContentTitle>
              <IoCloseOutline
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 17,
                  right: 20,
                  fontSize: 40,
                  color: '#E7E7E7',
                }}
              />
            </ButtonPlaceTitleWrap>
            <InputWrap>
              <InputPlace>
                <InputBox
                  type="text"
                  value={word}
                  id="keyword"
                  placeholder="주소나 키워드를 검색해주세요."
                  onChange={onChangeSearch}
                />
                <IoSearchOutline
                  type="button"
                  onClick={handleComplete}
                  style={{
                    marginLeft: 'auto',
                    display: 'flex-end',
                    fontSize: '20px',
                    color: '#B6B6B6',
                  }}
                />
              </InputPlace>
            </InputWrap>
            <ResultSearch>
              {resultData.map((info) => {
                return (
                  <div key={uuidv4()}>
                    <JustWrap
                      key={uuidv4()}
                      onClick={() => {
                        handlePlace(
                          info.place_name,
                          info.address_name,
                          info.x,
                          info.y,
                        );
                      }}
                    >
                      <PlaceNameInBox>{info.place_name}</PlaceNameInBox>
                      <PlaceAddressInBox>{info.address_name}</PlaceAddressInBox>
                    </JustWrap>
                    <SectionLine />
                  </div>
                );
              })}
            </ResultSearch>
          </ModalChang>
        </PlaceModal>
      </WholeWrap>
    </>
  );
}

const PlaceNameInBox = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const PlaceAddressInBox = styled.div`
  font-size: 12px;
  color: grey;
  margin-bottom: 15px;
`;

const SectionLine = styled.hr`
  width: 100%;
  background-color: #e7e7e7;
  height: 1px;
  border: 0;
`;

const InputPlace = styled.div`
  width: 350px;
  height: 50px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 15px;
  justify-content: space-between;
  display: flex;
`;

const InputBox = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

const WholeWrap = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: relative;
`;

const PlaceModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalChang = styled.div`
  width: 400px;
  height: 480px;
  border-radius: 20px;
  background-color: white;
`;

const InputWrap = styled.div`
  margin: 25px 25px 5px;
`;

const ResultSearch = styled.div`
  width: 350px;
  height: 300px;
  overflow-y: auto;
  background-color: #efefef;
  overflow-x: hidden;
  margin: 0 25px 5px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 10px;
`;

const JustWrap = styled.div`
  margin: 10px;
  cursor: pointer;
`;

const ButtonPlaceTitleWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #232323;
  border-radius: 20px 20px 0px 0px;
  height: 74px;
`;

const ContentTitle = styled.p`
  font-size: 20px;
  margin-left: 125px;
  color: #e7e7e7;
`;

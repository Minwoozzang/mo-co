import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authState from '../../../recoil/authState';

const AddInfoModal = ({ handleModalClose, isModalOpen }) => {
  const user = useRecoilValue(authState);
  const navigate = useNavigate();
  return (
    <>
      {isModalOpen === true ? (
        <InfoModal>
          <Overlay />
          <Content>
            <IoCloseOutline
              color="white"
              cursor={'pointer'}
              onClick={handleModalClose}
              style={{ position: 'absolute', top: 20, right: 20, fontSize: 30 }}
            />
            <HelloImoji>🎊</HelloImoji>
            <InfoModalTitle>MOCO에 오신 것을 환영합니다!</InfoModalTitle>
            <InfoModalNudge>
              세부 정보를 등록하고<br></br>맞춤 모임 추천을 받아보세요!
            </InfoModalNudge>
            <InfoModalGuide>
              1. 미등록시, 맞춤 모임 추천을 받을 수 없습니다.<br></br>
              2. 마이페이지에서 세부 정보를 등록할 수도 있습니다.
            </InfoModalGuide>
            <InfoModalBtn
              onClick={() => {
                localStorage.setItem(`${user?.uid}`, true);
                navigate('/onboarding');
              }}
            >
              세부 정보 등록
            </InfoModalBtn>
          </Content>
        </InfoModal>
      ) : null}
    </>
  );
};

export default AddInfoModal;

const InfoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  background-color: #7c7b7bc5;
`;

const Content = styled.div`
  background-color: #111111;
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4rem;
  border: 1px solid black;
  border-radius: 1rem;
  width: 25rem;
  height: 30rem;
`;

const HelloImoji = styled.div`
  font-size: 2.5rem;
`;

const InfoModalTitle = styled.div`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const InfoModalNudge = styled.div`
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.5rem;
  text-decoration: underline;
  text-decoration-color: #feff80;
  text-decoration-thickness: 0.2rem;
  text-underline-offset: 0.2rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const InfoModalGuide = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #a9a9a9;
`;

const InfoModalBtn = styled.button`
  cursor: pointer;
  border: 1px solid black;
  background-color: #feff80;
  font-size: 1rem;
  width: 12.5rem;
  height: 2.7rem;
  border-radius: 5px;
`;

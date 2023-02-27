import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const AddInfoModal = ({ handleModalClose, currentUser }) => {
  const navigate = useNavigate();
  return (
    <InfoModal>
      <IoCloseOutline
        cursor={'pointer'}
        onClick={handleModalClose}
        style={{ position: 'absolute', top: 20, right: 20, fontSize: 20 }}
      />
      <HelloImoji>🎉</HelloImoji>
      <InfoModalTitle>모코에 오신 것을 환영합니다!</InfoModalTitle>
      <InfoModalNudge>
        회원님의 세부 정보를 등록하고<br></br>맞춤 모임 추천을 받아보세요!
      </InfoModalNudge>
      <InfoModalGuide>
        1. 미등록시, 맞춤 모임 추천을 받을 수 없습니다.<br></br>
        2. 마이페이지에서 추가 정보를 등록할 수도 있습니다.
      </InfoModalGuide>
      <InfoModalBtn
        onClick={() => {
          localStorage.setItem(`${currentUser.uid}`, true);
          navigate('/onboarding');
        }}
      >
        추가 정보 등록
      </InfoModalBtn>
    </InfoModal>
  );
};

export default AddInfoModal;

const InfoModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const HelloImoji = styled.div`
  font-size: 3rem;
`;

const InfoModalTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoModalNudge = styled.div`
  font-size: 1rem;
  text-align: center;
  text-decoration: underline;
  text-decoration-color: #ff8398;
  text-decoration-thickness: 0.2rem;
  margin-bottom: 1rem;
`;

const InfoModalGuide = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #a9a9a9;
`;

const InfoModalBtn = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid black;
  background-color: transparent;
  font-size: 1rem;
`;

import styled from '@emotion/styled';

const ApplyModal = ({
  isModalOpen,
  handleModalOk,
  handleModalCancel,
  setJoinMessage,
  joinMessage,
}) => {
  return (
    <>
      {isModalOpen ? (
        <InfoModal>
          <Overlay />
          <Content>
            <ModalTitle>이 모임에 참여 신청하시겠습니까?</ModalTitle>
            <ApplyText
              onChange={(e) => {
                setJoinMessage(e.target.value);
              }}
              value={joinMessage}
              maxLength={300}
              placeholder="참여 동기 및 다짐을 적으면 더 좋습니다 (최대 300자)"
            />
            <ApplyBtnBox>
              <ApplyBtnNo onClick={handleModalCancel}>취소</ApplyBtnNo>
              <ApplyBtnYes onClick={handleModalOk}>지원하기</ApplyBtnYes>
            </ApplyBtnBox>
            <GuideText>
              내 코딩모임 보기에서 신청한 모임을 확인할 수 있어요
            </GuideText>
          </Content>
        </InfoModal>
      ) : null}
    </>
  );
};

export default ApplyModal;

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
  background-color: #232323;
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

const ModalTitle = styled.div`
  color: white;
  text-align: center;
  line-height: 1.8rem;
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ApplyText = styled.textarea`
  height: 10rem;
  width: 20rem;
  padding: 0.7rem;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  outline: none;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ApplyBtnBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ApplyBtnYes = styled.button`
  width: 9.5rem;
  height: 2.8rem;
  background-color: #feff80;
  border-radius: 5px;
  border: 1px solid black;
  font-weight: 500;
  cursor: pointer;
`;

const ApplyBtnNo = styled.button`
  width: 9.5rem;
  height: 2.8rem;
  color: white;
  background-color: #6c6c6c;
  border-radius: 5px;
  border: 1px solid black;
  font-weight: 500;
  cursor: pointer;
`;

const GuideText = styled.div`
  color: #b5b5b5;
  font-size: 0.8rem;
`;

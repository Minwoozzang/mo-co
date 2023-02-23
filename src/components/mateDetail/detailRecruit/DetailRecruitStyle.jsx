import styled from '@emotion/styled';

export const RecruitWrap = styled.div`
  width: 320px;
  height: 540px;
  border: 1px solid #d9d9d9;
  background-color: #232323;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 150px;
  right: 50px;
  border-radius: 20px;
`;
export const RecruitFont = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #cecece;
  margin-bottom: 16px;
`;
export const RecruitArea = styled.div`
  width: 100%;
`;
export const AreaDetail = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
export const RecruitDate = styled.div`
  width: 100%;
`;
export const DateDetail = styled.p`
  font-size: 16px;
  color: #fff;
`;
export const RecruitStack = styled.div`
  width: 100%;
`;
export const StackDetail = styled.p`
  color: #fff;
`;
export const RecruitCurrent = styled.div`
  width: 100%;
`;
export const RecruitDetail = styled.p`
  font-size: 16px;
  color: #fff;
`;
export const RecruitBtn = styled.button`
  width: 240px;
  height: 50px;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid;
  border-radius: 10px;
  background-color: #feff80;
`;

export const RecruitModal = styled.form`
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RecruitModalTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

export const RecruitModalContentBox = styled.div`
  padding: 20px;
  flex-direction: row;
  display: flex;
`;
export const RecruitModalContent = styled.textarea`
  flex: 1;
  padding: 20px;
  border: 1px solid #d9d9d9;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100px;
  outline: none;
  font-size: 15px;
`;

export const RecruitModalBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const RecruitModalBtnNo = styled.button`
  width: 200px;
  height: 45px;
  border: 1px solid black;
  background-color: transparent;
`;

export const RecruitModalBtnYes = styled.button`
  width: 200px;
  height: 45px;
  border: 1px solid black;
  background-color: transparent;
`;

export const RecruitFooter = styled.div`
  padding: 20px;
  color: #b9b9b9;
`;

export const RecruitGuide = styled.div`
  padding: 20px;
`;

export const UserHr = styled.hr`
  margin: 0px 40px 0px 40px;
  border: 1;
  width: 100%;
  border-top: 1px solid #3b3b3b;
`;

import styled from '@emotion/styled';
import { Modal } from 'antd';

export const RecruitWrap = styled.div`
  width: 20rem;
  height: 33.75rem;
  border: 0.0625rem solid #d9d9d9;
  background-color: #232323;
  padding: 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 12.5rem;
  right: 20rem;
  border-radius: 1.25rem;
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    top: 7rem;
    right: 1.5rem;
  }
`;

export const RecruitName = styled.div`
  width: 100%;
`;
export const NameDetail = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
`;
export const RecruitFont = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: #cecece;
  margin-bottom: 1rem;
`;
export const RecruitArea = styled.div`
  width: 100%;
`;
export const AreaDetail = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
`;
export const RecruitDate = styled.div`
  width: 100%;
`;
export const DateDetail = styled.p`
  font-size: 1rem;
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
  font-size: 1rem;
  color: #fff;
`;
export const RecruitBtn = styled.button`
  width: 15rem;
  height: 3.125rem;
  font-weight: 600;
  font-size: 1rem;
  border: 0.0625rem solid;
  border-radius: 0.625rem;
  background-color: #feff80;
`;

export const RecruitModal = styled.form`
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RecruitModalTitle = styled.div`
  font-size: 1.375rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.25rem;
`;

export const RecruitModalContentBox = styled.div`
  padding: 1.25rem;
  flex-direction: row;
  display: flex;
`;
export const RecruitModalContent = styled.textarea`
  flex: 1;
  padding: 1.25rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #d9d9d9;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 6.25rem;
  outline: none;
  font-size: 0.9375rem;
`;

export const RecruitModalBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.25rem;
`;

export const RecruitModalBtnNo = styled.button`
  width: 12.5rem;
  height: 2.8125rem;
  border-radius: 0.3125rem;
  background-color: #6c6c6c;
  color: white;
  border: 0.0625rem solid black;
`;

export const RecruitModalBtnYes = styled.button`
  width: 12.5rem;
  height: 2.8125rem;
  border-radius: 0.3125rem;
  background-color: #feff80;
  border: 0.0625rem solid black;
`;

export const RecruitFooter = styled.div`
  padding: 1.25rem;
  color: #b9b9b9;
`;

export const RecruitGuide = styled.div`
  padding: 1.25rem;
`;

export const UserHr = styled.hr`
  margin: 0rem 2.5rem 0rem 2.5rem;
  border: 1;
  width: 100%;
  border-top: 0.0625rem solid #3b3b3b;
`;

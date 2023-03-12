import styled from '@emotion/styled';
import { FiShare2 } from 'react-icons/fi';

export const GroupWrap = styled.div`
  height: 100%;
`;
export const GroupHeader = styled.h4`
  width: 100%;
  height: 1.25rem;
  margin-top: 2rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: #feff80;
  padding-left: 22.5rem;

  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    padding-left: 12rem;
    width: 55%;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    padding-left: 9.5rem;
    width: 55%;
  }

  /* 태블릿, 아이패드 */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
    padding-left: 8.5rem;
  }
`;

export const GroupUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    margin-left: 12rem;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin-left: 9.5rem;
  }
`;
export const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    margin: 2rem 23rem 0 0;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 2rem 8rem 0 0;
  }
`;

export const GroupImg = styled.img`
  /* width: 2.5rem; */
  height: 2.5rem;
  border-radius: 1.25rem;
  margin-top: auto;

  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
  }
`;
export const GroupUserId = styled.p`
  margin: 2.6875rem 0.5rem 0.5rem;
  color: #dcdcdc;
  font-size: 1.1rem;
  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
  }
`;

export const Social = styled.div`
  display: flex;

  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    margin-left: 42rem;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin-left: 24rem;
  }
`;

export const DropdownOptions = styled(FiShare2)`
  font-size: 1.5625rem;
  margin: 2.75rem 0 0 0;
  color: white;
  cursor: pointer;
`;

export const GroupBox = styled.div`
  max-width: 47.5rem;
  height: 100%;
  min-height: 68.75rem;
  margin: 0 0 0 352px;
  background-color: #232323;
  border-radius: 1.25rem;
  color: #fff;
  word-wrap: break-word;
  line-height: 1.5rem;

  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    max-width: 800px;
    margin: 0 0 0 190px;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    max-width: 500px;
    margin: 0 0 0 150px;
  }

  /* 태블릿, 아이패드 */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
    max-width: 550px;
    margin: 0 0 0 140px;
  }
`;
export const GroupPerson = styled.div`
  width: 100%;
  padding: 5rem 6.25rem;
  margin: 1.875rem 0 1.875rem 0;
  font-size: 1.1rem;
`;

export const UserHr = styled.hr`
  margin-top: 1.5rem;
  border: 0;
  height: 0;
  border-top: 0.0625rem solid #8c8c8c;
`;

export const Bookmark = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

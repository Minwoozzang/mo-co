import styled from '@emotion/styled';

export const AddCommentListAll = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddCommentListWrap = styled.div`
  display: flex;
  flex-direction: row;
  border: 0.125rem solid #525252;
  width: 100%;
  max-width: 45.3125rem;
  height: 8.125rem;
  padding: 1.25rem;
  margin: 3.125rem 28.75rem 0 0rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
  /* 맥북 에어 */
  @media only screen and (min-device-width: 85.375rem) and (max-device-width: 90rem) {
    margin: 3.125rem 19.375rem 0 0rem;
    max-width: 45.3125rem;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 85.375rem) {
    margin: 0 13.75rem 0 0rem;
    max-width: 31.25rem;
  }
  /* 태블릿, 아이패드 */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
    margin: 2rem 0 0 0;
  }
`;

export const AddInputDiv = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 1%;
`;

export const AddInputContent = styled.input`
  font-size: 1rem;
  width: 100%;
  height: 100%;
  background-color: #111;
  outline: none;
  border: none;
  :focus {
    color: #ffffff;
  }
`;

export const AddCommentBtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-right: 6.25rem;
`;

export const AddCommentBtn = styled.button`
  width: 7.5rem;
  height: 2.1875rem;
  cursor: pointer;
  background-color: #545454;
  color: #fff;
  border: 0.0625rem solid #545454;
  border-radius: 0.3125rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 1.875rem 2.5rem 0 17.5rem;
  :hover {
    background-color: #3b3b3b;
    color: #fff;
    border-radius: 0.3125rem;
    border: none;
  }
  /* 맥북 에어 */
  @media only screen and (min-device-width: 85.375rem) and (max-device-width: 90rem) {
    margin: 1.875rem 0rem 0 24.375rem;
    max-width: 45.3125rem;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 64rem) and (max-device-width: 85.375rem) {
    margin: 1.875rem 1.25rem 0 17.5rem;
  }
  /* 태블릿, 아이패드 */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
    margin: 1.875rem 0rem 0 40rem;
  }
`;

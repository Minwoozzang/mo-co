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
  border: 2px solid #525252;
  width: 100%;
  max-width: 725px;
  height: 130px;
  padding: 20px 25px 25px 40px;
  margin: 50px 460px 0 0px;
  box-sizing: border-box;
  border-radius: 10px;
  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    margin: 50px 310px 0 0px;
    max-width: 725px;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 0 220px 0 0px;
    max-width: 500px;
  }
`;

export const AddInputDiv = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 1%;
`;

export const AddInputContent = styled.input`
  width: 100%;
  height: 100%;
  background-color: #111;

  border: none;
  :focus {
    color: #858585;
  }
`;

export const AddCommentBtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-right: 100px;
`;

export const AddCommentBtn = styled.button`
  width: 120px;
  height: 35px;
  cursor: pointer;
  background-color: #545454;
  color: #fff;
  border: 1px solid #545454;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  margin: 30px 40px 0 280px;
  :hover {
    background-color: #3b3b3b;
    color: #fff;
    border-radius: 5px;
    border: none;
  }
  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    margin: 30px 0px 0 390px;
    max-width: 725px;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 30px 20px 0 280px;
  }
`;

import styled from '@emotion/styled';

export const HeaderBody = styled.div`
  width: 100%;
  height: 80px;
  background-color: #111111;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  min-width: 46.1875rem;
  padding: 0 2rem;
  /* z-index: 1;
  position: fixed;
  top: 0; */
  /* width: 100% */
  /* left: 0;
  right: 0; */
  /* margin-bottom: 5rem; */
`;

export const HeaderInfoBody = styled.div`
  width: 1180px;
  /* width: 61.456%; */
  height: 3.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoAndMateBox = styled.div`
  width: 20rem;
  /* width: 27.12%; */
  height: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 46.875rem) {
    width: 16rem;
    display: flex;
  }
  @media (max-width: 30rem) {
    width: 15rem;
  }
`;

export const HeaderLogo = styled.div`
  cursor: pointer;
  font-size: 1.875rem;
  background-image: url('https://i.imgur.com/h1eUKhk.png');
  background-size: 8rem;
  background-repeat: no-repeat;
  background-position: center;
  width: 8.125rem;
  /* width: 40.625%; */
  height: 3.125rem;
  @media (max-width: 46.875rem) {
    background-size: 7rem;
  }
`;

export const MyCodingMate = styled.div`
  cursor: pointer;
  font-size: 1.1875rem;
  font-weight: 600;
  color: #ffffff;
  /* hover animation */
  :hover {
    color: #feff80;
  }
  @media (max-width: 46.875rem) {
    font-size: 1rem;
  }
`;

export const TeamAndLoginBox = styled.div`
  width: 20.625rem;
  height: 3.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 46.875rem) {
    width: 19rem;
    height: 3.125rem;
    display: flex;
  }
  @media (max-width: 35.9375rem) {
    width: 16rem;
    height: 3.125rem;
    display: flex;
  }
  @media (max-width: 32.8125rem) {
    width: 14rem;
  }
  @media (max-width: 30.3125rem) {
    width: 11rem;
  }
`;

export const MakeTeam = styled.button`
  width: 7.125rem;
  height: 2.5rem;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #0a0a0a;
  background-color: #ffffff;
  @media (max-width: 46.875rem) {
    width: 5.5rem;
    font-size: 0.7813rem;
  }
`;

export const HeaderIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid;
  cursor: pointer;
`;

export const HeaderRoute = styled.div`
  display: flex;
`;

export const MateRoute = styled.div`
  margin-right: 3.125rem;
  cursor: pointer;
`;

export const LoginRoute = styled.div`
  cursor: pointer;
  color: #ffffff;
`;

export const HeaderUserIconBody = styled.div`
  /* width: 30%; */
`;

export const NavigateMypage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const HeaderImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 40px;
  margin-top: 3rem;

  @media (max-width: 96.875rem) {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 30px;
  }
`;

export const HeaderDropDownListBox = styled.div`
  width: 15.625rem;
  height: 18.75rem;

  margin-top: 0.625rem;

  border-radius: 5px;
  background-color: #3b3b3b;
  box-shadow: 2px 2px 10px 10px #0001;

  position: absolute;

  z-index: 999;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: #3b3b3b;
    border-top: 0;
    margin-left: -22px;
    margin-top: -13px;

    z-index: 5;
  }

  @media (max-width: 96.875rem) {
    width: 15.625rem;
    height: 18.75rem;

    border-radius: 5px;
    background-color: #3b3b3b;
    box-shadow: 2px 2px 10px 10px #0001;

    z-index: 999;

    position: absolute;

    transform: translateX(-13.125rem);

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 93%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-bottom-color: #3b3b3b;
      border-top: 0;
      margin-left: -22px;
      margin-top: -13px;

      z-index: 5;
    }
  }
`;

export const HeaderImageBox = styled.div`
  width: 100%;
  height: 100px;

  text-align: center;
`;

export const HeaderImageText = styled.div`
  margin-top: 1.25rem;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 550;
`;

export const HeaderDropDownListSection = styled.ul`
  width: 100%;
  height: 12.5rem;

  margin-top: 3rem;
`;

export const DropDownListBody = styled.div`
  width: 100%;
  height: 2.8125rem;

  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #b6b6b6;
  }

  margin-top: 1.25rem;
  cursor: pointer;
`;

export const HeaderDropDownList = styled.li`
  font-size: 1.3rem;
  color: #ffffff;
  list-style: none;
`;

export const HeaderNotiDropDownList = styled.li`
  font-size: 1rem;
  color: #ffffff;
  list-style: none;
`;

export const HeaderNotiDropDownListBox = styled.div`
  width: 17.5rem;
  height: 18.75rem;

  margin-top: 0.625rem;

  border-radius: 5px;
  background-color: #3b3b3b;
  box-shadow: 2px 2px 10px 10px #0001;

  overflow-y: auto;

  z-index: 999;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: #3b3b3b;
    border-top: 0;
    margin-left: -22px;
    margin-top: -13px;

    z-index: 5;
  }
`;

// 검색창 부분
export const SearchIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;
export const SearchLayer = styled.div`
  z-index: 3;
  display: block;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
export const SearchModalLayer = styled.div`
  position: fixed;
  /* top: 31.005px; */
  top: 60px;
  left: 72%;
  /* right: 20%; */
  /* background-color: aliceblue; */
`;
export const HeaderSearchDropDownListBox = styled.div`
  width: 15.625rem;
  height: 7.5rem; //200px
  margin-top: 0.625rem;
  border-radius: 5px;
  background-color: #3b3b3b;
  box-shadow: 2px 2px 10px 10px #0001;
  z-index: 999;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-bottom-color: #3b3b3b;
    border-top: 0;
    margin-left: -25px;
    margin-top: -10px;

    z-index: 5;
  }

  @media (max-width: 96.875rem) {
    width: 15.625rem;
    height: 7.5rem;
    margin-top: 0.9rem;
    border-radius: 5px;
    background-color: #3b3b3b;
    box-shadow: 2px 2px 10px 10px #0001;
    z-index: 999;

    transform: translateX(-14.0625rem);

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 98%;
      width: 0;
      height: 0;
      border: 15px solid transparent;
      border-bottom-color: #3b3b3b;
      border-top: 0;
      margin-left: -25px;
      margin-top: -10px;

      z-index: 5;
    }
  }
`;

export const HeaderSearchXbuttonBox = styled.div`
  width: 100%;
  height: 1.875rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px 0;
  /* margin-bottom: 10px; */
`;

export const HeaderSearchXbutton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const HeaderSearchDropDownListSection = styled.div`
  width: 100%;
  height: 4.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 10px; */
  /* border: 1px solid; */
`;
export const HeaderSearchDropDownHr = styled.div`
  width: 90%;
  border: 0.5px solid gray;
  margin: 0 auto;
`;

export const HeaderSearchBox = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 230px;
  /* height: 30px; */
  /* background-color: royalblue; */
`;

export const HeaderSearchInput = styled.input`
  border-radius: 10px;
  height: 2.5rem;
  width: 10rem;
  border: 0.1px solid gray;
  padding-left: 0.625rem;
  margin-left: 0.9375rem;
  font-size: 0.8125rem;
  :focus {
    outline: none;
  }
`;

export const HeaderSearchInputBtn = styled.button`
  border-radius: 4px;
  border: none;
  width: 2.5rem;
  height: 1.5625rem;
  background-color: #d9d9d9;
`;

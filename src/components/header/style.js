import styled from '@emotion/styled';

export const HeaderBody = styled.div`
  width: 100%;
  height: 80px;
  background-color: #111111;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: fixed;
  top: 0;
  /* width: 100% */
  left: 0;
  right: 0;
`;

export const HeaderInfoBody = styled.div`
  width: 1180px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoAndMateBox = styled.div`
  width: 20rem;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLogo = styled.div`
  cursor: pointer;
  font-size: 30px;
  background-image: url('images/logo.png');
  background-size: 16rem;
  background-repeat: no-repeat;
  background-position: center;
  width: 130px;
  height: 50px;
`;

export const MyCodingMate = styled.div`
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
  color: #ffffff;
  /* hover animation */
  :hover {
    color: #feff80;
  }
`;

export const TeamAndLoginBox = styled.div`
  width: 330px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MakeTeam = styled.button`
  width: 114px;
  height: 40px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #0a0a0a;
  background-color: #ffffff;
`;

export const HeaderIcon = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid;
  cursor: pointer;
`;

export const HeaderRoute = styled.div`
  display: flex;
`;

export const MateRoute = styled.div`
  margin-right: 50px;
  cursor: pointer;
`;

export const LoginRoute = styled.div`
  cursor: pointer;
  color: #ffffff;
`;

export const NavigateMypage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const HeaderImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const HeaderDropDownListBox = styled.div`
  width: 250px;
  height: 300px;

  margin-top: 10px;

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
    border: 20px solid transparent;
    border-bottom-color: #3b3b3b;
    border-top: 0;
    margin-left: -22px;
    margin-top: -13px;

    z-index: 5;
  }
`;

export const HeaderImageBox = styled.div`
  width: 100%;
  height: 100px;

  text-align: center;

  margin-top: 40px;
`;

export const HeaderImageText = styled.div`
  margin-top: 20px;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 550;
`;

export const HeaderDropDownListSection = styled.ul`
  width: 100%;
  height: 200px;
`;

export const DropDownListBody = styled.div`
  width: 100%;
  height: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #b6b6b6;
  }

  margin-top: 20px;
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
  width: 280px;
  height: 300px;

  margin-top: 10px;

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

export const HeaderSearchDropDownListBox = styled.div`
  width: 250px;
  height: 100px; //200px
  margin-top: 10px;
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
    border: 20px solid transparent;
    border-bottom-color: #3b3b3b;
    border-top: 0;
    margin-left: -22px;
    margin-top: -13px;

    z-index: 5;
  }
`;

export const HeaderSearchXbuttonBox = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px 0;
`;

export const HeaderSearchXbutton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const HeaderSearchDropDownListSection = styled.div`
  width: 100%;
  height: 50px;
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
  /* justify-content: space-around; */
  align-items: center;
  width: 200px;
  height: 30px;
`;

export const HeaderSearchInput = styled.input`
  border-radius: 10px;
  height: 30px;
  width: 140px;
  border: 0.1px solid gray;
  padding-left: 10px;
  margin-left: 15px;
  :focus {
    outline: none;
  }
`;

export const HeaderSearchInputBtn = styled.button`
  border-radius: 4px;
  border: none;
  width: 40px;
  height: 25px;
  background-color: #d9d9d9;
`;

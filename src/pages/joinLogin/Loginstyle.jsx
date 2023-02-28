import styled from '@emotion/styled';
import background from '../../assets/background/login_background.png';

export const LoginBody = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/background/login_background.png')
    no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.div`
  width: 500px;
  height: 555px;

  border-radius: 20px;

  background-color: #111111;
`;

export const LoginTitleLogo = styled.div`
  height: 33px;

  text-align: center;

  margin-top: 80px;
`;

export const LoginTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Pretendard';
  font-style: normal;

  letter-spacing: -0.03em;
  color: #ffffff;
  margin-top: 85px;
`;

export const LoginInputBody = styled.div`
  width: 500px;
  height: 105px;
  margin-top: 65px;
`;

export const LoginInputSection = styled.div`
  margin-left: 100px;
`;

export const EmailBody = styled.div`
  width: 380px;
  height: 40px;
`;

export const EmailText = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 17px;

  letter-spacing: -0.03em;

  color: #9d9d9d;
`;

export const LoginEmailInput = styled.input`
  width: 300px;
  height: 25px;
  font-size: 1.2rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom-color: #545454;
  color: #ffffff;
  background: none;
  :focus-visible {
    outline: none;
  }
  padding-left: 1px;
`;

export const PasswordText = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: #9d9d9d;
`;

export const PasswordBody = styled.div`
  width: 380px;
  height: 40px;
  margin-top: 20px;
`;

export const LoginPasswordInput = styled.input`
  width: 300px;
  height: 25px;
  font-size: 1.2rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom-color: #545454;
  color: #ffffff;
  background: none;
  :focus-visible {
    outline: none;
  }
  padding-left: 1px;
`;

export const WarnigTextBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const WarnigText = styled.div`
  color: red;
`;

export const LoginLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 50px;
`;

export const GoogleLogo = styled.div`
  width: 120px;
  height: 140px;
  background-color: #232323;
  border-radius: 20px;
  border: 1px solid #3b3b3b;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GithubLogo = styled.div`
  width: 120px;
  height: 140px;
  background-color: #232323;
  border-radius: 20px;
  border: 1px solid #3b3b3b;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;
export const LogoIconTitle = styled.div`
  color: #ffffff;
  font-size: 0.875rem;
`;

export const LoginLouteBody = styled.div`
  width: 300px;
  margin-top: 20px;
  margin-left: 100px;
  display: flex;
  justify-content: flex-end;
`;

export const LoginBtn = styled.div`
  width: 300px;
  height: 44px;
  background-color: #feff80;
  border-radius: 5px;
  font-weight: 600;
  margin-left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 15px;
`;

export const LouteSignUpPageBtn = styled.div`
  width: 48px;
  height: 15px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 14px;
  letter-spacing: -0.03em;

  color: #858585;

  cursor: pointer;
`;

export const ToggleEmailBtn = styled.div`
  color: #9d9d9d;
  cursor: pointer;
  text-align: center;
  font-size: 0.95rem;
  text-decoration: underline;
  text-underline-offset: 5px;
`;

export const ToggleEmailBack = styled.div`
  width: 170px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 14px;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 8px;

  color: #9d9d9d;

  cursor: pointer;
`;

export const ToggleSocialBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

export const FullScreen = styled.body`
  background-image: url(${background});
`;

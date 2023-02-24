import React, { useRef, useState } from 'react';
import {
  LoginBody,
  LoginForm,
  LoginTitleLogo,
  LoginTitle,
  LoginInputBody,
  LoginEmailInput,
  LoginPasswordInput,
  LoginLogo,
  GoogleLogo,
  GithubLogo,
  LoginLouteBody,
  LoginBtn,
  LouteSignUpPageBtn,
  EmailBody,
  PasswordBody,
  LoginInputSection,
  EmailText,
  PasswordText,
  WarnigTextBody,
  WarnigText,
  ToggleSocialBox,
  ToggleEmailBtn,
  ToggleEmailBack,
  LogoIcon,
  LogoIconTitle,
} from './Loginstyle';

import { useNavigate } from 'react-router';
import { emailRegex, pwRegex } from '../../common/utils';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';
import { authService, db } from '../../common/firebase';
import { doc, setDoc } from '@firebase/firestore';
import Vector from '../../../src/assets/login/Vector.png';
import Vector1 from '../../../src/assets/login/Vector-1.png';
import Vector2 from '../../../src/assets/login/Vector-2.png';
import Vector3 from '../../../src/assets/login/Vector-3.png';
import Vector4 from '../../../src/assets/login/Vector-4.png';
import Github from '../../../src/assets/login/GITHUB-LOGO.png';
import Google from '../../../src/assets/login/GOOGLE-LOGO.png';

const Login = () => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');

  // 비밀번호
  const [password, setPassword] = useState('');
  const pwRef = useRef(null);

  // 걍고문자
  const [warningText, setWarningText] = useState('');

  const navigate = useNavigate();

  // 유효성 검시
  const validateInputs = () => {
    if (!email) {
      setWarningText('email을 입력해주세요.');
      emailRef.current.focus();
      return true;
    }
    if (!password) {
      setWarningText('password를 입력해주세요.');
      pwRef.current.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = password.match(pwRegex);

    if (matchedEmail === null) {
      setWarningText('이메일 형식에 맞게 입력해 주세요.');
      emailRef.current.focus();
      return true;
    }
    if (matchedPw === null) {
      setWarningText(
        '비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.',
      );
      pwRef.current.focus();
      return true;
    }
  };

  // 하단 토글 버튼
  const [emailLogin, setEmailLogin] = useState(true);
  const [toggleText, setToggleText] = useState(true);

  // 로그인 토글
  const ToggleSocial = () => {
    if (toggleText === true) {
      setEmailLogin(false);
      setToggleText(false);
    } else if (toggleText === false) {
      setEmailLogin(true);
      setToggleText(true);
    }
  };

  // 로그인 버튼 클릭
  const LogginBtnHandle = () => {
    if (validateInputs()) {
      return;
    }

    signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        console.log('로그인성공');
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => {
        console.log('err.message:', err.message);
        if (err.message.includes('user-not-found')) {
          setWarningText('회원이 아닙니다. 회원가입을 먼저 진행해 주세요.');
        }
        if (err.message.includes('wrong-password')) {
          setWarningText('비밀번호가 틀렸습니다.');
        }
      });
  };

  const EnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      LogginBtnHandle();
    }
  };

  // 구글 로그인
  const gooleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((res) => {
        navigate('/');
        setDoc(doc(db, 'user', res.user.uid), {
          uid: res.user.uid,
          email: res.user.email,
          nickname: res.user.displayName,
          bookmarks: [],
          profileImg: 'https://imhannah.me/common/img/default_profile.png',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 깃허브 로그인
  const githubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(authService, provider)
      .then((res) => {
        navigate('/');
        setDoc(doc(db, 'user', res.user.uid), {
          uid: res.user.uid,
          email: res.user.email,
          nickname: res.user.displayName,
          bookmarks: [],
          profileImg: 'https://imhannah.me/common/img/default_profile.png',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  회원가입 페이지로 이동
  const navigateSignUpPage = () => {
    navigate('/signup');
  };
  return (
    <LoginBody>
      <LoginForm>
        <LoginTitleLogo>
          <img src={Vector} alt="" />
          <img src={Vector1} alt="" />
          <img src={Vector2} alt="" />
          <img src={Vector3} alt="" />
          <img src={Vector4} alt="" />
        </LoginTitleLogo>

        {emailLogin ? (
          <>
            <LoginTitle>SNS로 간편하게 로그인하세요 🙌</LoginTitle>
            <LoginLogo>
              <GithubLogo onClick={githubLogin}>
                <LogoIcon src={Github} alt="" />
                <LogoIconTitle>GitHub</LogoIconTitle>
              </GithubLogo>
              <GoogleLogo onClick={gooleLogin}>
                <LogoIcon src={Google} alt="" />
                <LogoIconTitle>Google</LogoIconTitle>
              </GoogleLogo>
            </LoginLogo>
          </>
        ) : (
          <>
            <LoginInputBody>
              <LoginInputSection>
                <EmailBody>
                  <EmailText>이메일</EmailText>
                  <LoginEmailInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                    onKeyPress={EnterKeyPress}
                  />
                </EmailBody>
                <PasswordBody>
                  <PasswordText>비밀번호</PasswordText>
                  <LoginPasswordInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={pwRef}
                    onKeyPress={EnterKeyPress}
                  />
                </PasswordBody>
              </LoginInputSection>
            </LoginInputBody>

            <WarnigTextBody>
              <WarnigText>{warningText}</WarnigText>
            </WarnigTextBody>

            <LoginBtn onClick={LogginBtnHandle}>로그인</LoginBtn>
            <LoginLouteBody>
              <LouteSignUpPageBtn onClick={navigateSignUpPage}>
                회원가입
              </LouteSignUpPageBtn>
            </LoginLouteBody>
          </>
        )}

        <ToggleSocialBox onClick={ToggleSocial}>
          {toggleText ? (
            <ToggleEmailBtn>E-mail로 로그인하기</ToggleEmailBtn>
          ) : (
            <ToggleEmailBack>SNS 계정으로 로그인하기</ToggleEmailBack>
          )}
        </ToggleSocialBox>
      </LoginForm>
    </LoginBody>
  );
};

export default Login;

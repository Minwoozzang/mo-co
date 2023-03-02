import React, { useRef, useState } from 'react';
import {
  SignUpBody,
  SignUpForm,
  SignUpTitleLogo,
  FormBox,
  SignUpInputBody,
  SignUpEmailInput,
  SignUpPasswordInput,
  SignUpLouteBody,
  SignUpBtn,
  LouteSignUpPageBtn,
  EmailBody,
  PasswordBody,
  SignUpInputSection,
  EmailText,
  PasswordText,
  NickNameBody,
  NickNameText,
  SignUpNickNameInput,
  WarnigText,
  CheckPasswordBody,
  CheckPasswordText,
  CheckSignUpPasswordInput,
  FullScreen,
  PasswordTextBody,
  PasswordTextInfo,
  LoginFooterText,
} from './SignUpstyle';

import { emailRegex, pwRegex } from '../../common/utils';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { authService, db } from '../../common/firebase';
import { doc, setDoc } from '@firebase/firestore';

const SignUp = () => {
  // 이메일
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);

  // 비밀번호
  const [password, setPassword] = useState('');
  const pwRef = useRef(null);

  // 비밀번호 확인
  const [checkPassword, setCheckPassword] = useState('');
  const pwCheckRef = useRef(null);

  // 닉네임
  const [nickName, setNickName] = useState('');
  const nickNameRef = useRef(null);

  // 경고문
  const [emailWarningText, setEmailWarningText] = useState('');
  const [pwWarningText, setPwWarningText] = useState('');
  const [checkPwWarningText, setCheckPwWarningText] = useState('');
  const [nickNameWarningText, setNickNameWarningText] = useState('');
  // 포커스 border color RED
  const [emRedColor, setEmRedColor] = useState('');
  const [pwRedColor, setPwRedColor] = useState('');
  const [checkPwdColor, setCheckPwdColor] = useState('');
  const [nickNameRedColor, setNickNameRedColor] = useState('');

  const navigate = useNavigate();

  // 로딩중일때
  const [loding, setLoding] = useState(false);

  const EnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  //  유효성 검사
  const validateInputs = () => {
    if (!email) {
      setEmailWarningText('필수 입력 항목입니다.');
      emailRef.current.focus();
      setEmRedColor('1.5px solid red');
      return true;
    }
    if (!password) {
      setPwWarningText('비밀번호를 입력해주세요.');
      pwRef.current.focus();
      setPwRedColor('1.5px solid red');
      return true;
    }
    if (checkPassword !== password) {
      setCheckPwWarningText('비밀번호가 일치하지 않습니다.');
      pwCheckRef.current.focus();
      setCheckPwdColor('1.5px solid red');
      return true;
    }
    if (nickName.length < 2 || nickName.length > 6) {
      setNickNameWarningText('2 ~ 6 자의 닉네임을 입력헤주세요.');
      nickNameRef.current.focus();
      setNickNameRedColor('1.5px solid red');
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = password.match(pwRegex);

    if (matchedEmail === null) {
      setEmailWarningText('이메일 형식에 맞게 입력해 주세요.');
      emailRef.current.focus();
      setEmRedColor('1.5px solid red');
      return true;
    }
    if (matchedPw === null) {
      setPwWarningText(
        '비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.',
      );
      pwRef.current.focus();
      setPwRedColor('1.5px solid red');
      return true;
    }
  };
  // 회원가입 버튼 클릭
  const handleSignUp = () => {
    if (validateInputs()) {
      return;
    }

    createUserWithEmailAndPassword(authService, email, password)
      .then((res) => {
        setLoding(true);
        if (authService.currentUser)
          setDoc(doc(db, 'user', res.user.uid), {
            uid: res.user.uid,
            email: email,
            profileImg: 'https://imhannah.me/common/img/default_profile.png',
            bookmarks: [],
            teamID: [],
          });

        updateProfile(authService.currentUser, {
          displayName: nickName,
        });

        setLoding(false);
        setEmail('');
        setPassword('');
        setCheckPassword('');
        setNickName('');
        navigate('/');
      })
      .catch((err) => {
        setLoding(false);
        if (err.message.includes('already-in-use')) {
          setEmailWarningText('이미 사용중인 아이디입니다.');
        }
      });
  };

  //  회원가입 페이지로 이동
  const navigationLoginPage = () => {
    navigate('/login');
  };
  return (
    <FullScreen>
      <SignUpBody>
        <SignUpForm>
          <FormBox>
            <SignUpTitleLogo>회원가입</SignUpTitleLogo>

            <SignUpInputBody>
              <SignUpInputSection>
                <EmailBody>
                  <EmailText>이메일</EmailText>
                  <SignUpEmailInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                    onKeyPress={EnterKeyPress}
                    placeholder="example@google.com"
                    style={{ border: emRedColor }}
                  />
                </EmailBody>

                <WarnigText>{emailWarningText}</WarnigText>

                <PasswordBody>
                  <PasswordTextBody>
                    <PasswordText>비밀번호</PasswordText>
                    <PasswordTextInfo>
                      영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를
                      입력해주세요
                    </PasswordTextInfo>
                  </PasswordTextBody>

                  <SignUpPasswordInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={pwRef}
                    onKeyPress={EnterKeyPress}
                    style={{ border: pwRedColor }}
                  />
                </PasswordBody>

                <WarnigText>{pwWarningText}</WarnigText>

                <CheckPasswordBody>
                  <CheckPasswordText>비밀번호 확인</CheckPasswordText>
                  <CheckSignUpPasswordInput
                    type="password"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    ref={pwCheckRef}
                    onKeyPress={EnterKeyPress}
                    style={{ border: checkPwdColor }}
                  />
                </CheckPasswordBody>

                <WarnigText>{checkPwWarningText}</WarnigText>

                <NickNameBody>
                  <NickNameText>닉네임</NickNameText>
                  <SignUpNickNameInput
                    type="text"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    ref={nickNameRef}
                    onKeyPress={EnterKeyPress}
                    placeholder="닉네임 2 ~ 6자"
                    style={{ border: nickNameRedColor }}
                  />
                </NickNameBody>

                <WarnigText>{nickNameWarningText}</WarnigText>
              </SignUpInputSection>
            </SignUpInputBody>
          </FormBox>
          <SignUpBtn onClick={handleSignUp} disabled={loding}>
            회원가입
          </SignUpBtn>
          <SignUpLouteBody>
            <LoginFooterText>이미 아이디가 있으신가요?</LoginFooterText>
            <LouteSignUpPageBtn onClick={navigationLoginPage}>
              로그인
            </LouteSignUpPageBtn>
          </SignUpLouteBody>
        </SignUpForm>
      </SignUpBody>
    </FullScreen>
  );
};

export default SignUp;

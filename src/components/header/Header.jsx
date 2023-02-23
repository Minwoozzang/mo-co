import { collection, onSnapshot, query, where } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { authService, db } from '../../common/firebase';
import {
  HeaderBody,
  HeaderInfoBody,
  HeaderLogo,
  NavigateMypage,
  LogoAndMateBox,
  MyCodingMate,
  TeamAndLoginBox,
  MakeTeam,
  LoginRoute,
  HeaderImage,
  HeaderDropDownListBox,
  HeaderDropDownList,
  HeaderImageBox,
  HeaderImageText,
  HeaderDropDownListSection,
  DropDownListBody,
  HeaderSearchBox,
  HeaderSearchInput,
  HeaderSearchInputBtn,
  HeaderSearchDropDownListBox,
  HeaderSearchDropDownListSection,
  HeaderSearchDropDownHr,
  HeaderSearchXbuttonBox,
  HeaderSearchXbutton,
} from './style';
import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

const Header = () => {
  // 헤더 로그인 토글
  const [loginToggle, setLoginToggle] = useState(true);

  // 헤더  토글
  const [headerMyIcon, setHeaderMyIcon] = useState(false);

  // 헤더 닉네임
  const [headerNickName, setHeaderNickName] = useState('');

  // 드랍다운
  const [dropDownClick, setDropDownClick] = useState(false);
  const [searchdropDownClick, setSearchdropDownClick] = useState(false);

  // 헤더 드랍다운 생성유뮤
  const [isUserDropDown, setIsUserDropDown] = useState(false);
  const [isSearchUserDropDown, setIsSearchUserDropDown] = useState(false);

  // 유저 정보 가져오기
  const [profileUserInfo, setProfileUserInfo] = useState([]);

  const getUserStackInfo = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfileUserInfo(newInfo);
    });
    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsUserDropDown(true);
        setLoginToggle(false);
        setHeaderMyIcon(true);
        setHeaderNickName(authService.currentUser?.displayName);
        getUserStackInfo();
        setIsSearchUserDropDown(true);
      } else if (!user) {
        setLoginToggle(true);
        setHeaderMyIcon(false);
        setIsUserDropDown(false);
        setIsSearchUserDropDown(false);
      }
    });
  }, []);

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  const navigateMyPage = () => {
    navigate('/mypage');
  };

  // 헤더 로그인 페이지로 이동
  const navigateLoginPage = () => {
    if (loginToggle === true) {
      navigate('/login');
    }
  };

  // 내 코딩모임 페이지로 이동
  const navigateMyCodingMate = () => {
    navigate(`/teamlist/${authService.currentUser.displayName}`);
  };

  // 검색 기능
  const [word, setWord] = useState('');
  const onChangeSearch = (e) => {
    // if (word === '') return;
    setWord(e.target.value);
  };
  const onSubmit = () => {
    navigate(`/search/${word}`);
  };
  const handleonKeyPress = (e) => {
    // Enter 키 입력 함수
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  const searchdropDownHandler = () => {
    if (searchdropDownClick === false) {
      setSearchdropDownClick(true);
    }
  };
  // const navigateMate = () => [navigate('/mate')];
  // 로그아웃
  const HeaderLogOut = () => {
    authService.signOut();
    window.location.replace('/');
  };

  const navigateMate = () => [navigate('/mate')];

  // 헤더 유무
  const locationNow = useLocation();
  if (locationNow.pathname === '/login' || locationNow.pathname === '/signup')
    return null;

  const dropDownHandler = () => {
    if (dropDownClick === false) {
      setDropDownClick(true);
    } else {
      setDropDownClick(false);
    }
  };

  return (
    <HeaderBody>
      <HeaderInfoBody>
        <LogoAndMateBox>
          <HeaderLogo onClick={navigateHome}>MOCO</HeaderLogo>
          <MyCodingMate onClick={navigateMyCodingMate}>
            내 코딩모임
          </MyCodingMate>
        </LogoAndMateBox>
        {/* <HeaderSearchBox>
          <AiOutlineSearch style={{ fontSize: '30px' }} />
          <HeaderSearchInput
            onChange={onChangeSearch}
            // type={'text'}
            // onKeyDown={handleKeyDown}
          />
          <HeaderSearchInputBtn type="button" onClick={onSubmit}>
            검색
          </HeaderSearchInputBtn>
        </HeaderSearchBox> */}
        <TeamAndLoginBox>
          <MakeTeam onClick={() => navigate('/write')}>팀 개설하기</MakeTeam>
          <div onClick={searchdropDownHandler}>
            {searchdropDownClick ? (
              <>
                {isSearchUserDropDown ? (
                  <NavigateMypage>
                    <AiOutlineSearch style={{ fontSize: '30px' }} />
                  </NavigateMypage>
                ) : (
                  ''
                )}
                <HeaderSearchDropDownListBox style={{ position: 'absolute' }}>
                  <HeaderSearchXbuttonBox>
                    <HeaderSearchXbutton
                      onClick={() => setSearchdropDownClick(false)}
                    >
                      <ImCancelCircle style={{ fontSize: '20px' }} />
                    </HeaderSearchXbutton>
                  </HeaderSearchXbuttonBox>
                  <HeaderSearchDropDownListSection>
                    <HeaderSearchBox>
                      <AiOutlineSearch style={{ fontSize: '30px' }} />
                      <HeaderSearchInput
                        onChange={onChangeSearch}
                        onKeyPress={handleonKeyPress}
                      />
                      <HeaderSearchInputBtn type="button" onClick={onSubmit}>
                        검색
                      </HeaderSearchInputBtn>
                    </HeaderSearchBox>
                  </HeaderSearchDropDownListSection>
                  {/* <HeaderSearchDropDownHr /> */}
                </HeaderSearchDropDownListBox>
              </>
            ) : (
              <NavigateMypage>
                <AiOutlineSearch style={{ fontSize: '30px' }} />
              </NavigateMypage>
            )}
          </div>

          {headerMyIcon ? (
            <div onClick={dropDownHandler}>
              {dropDownClick ? (
                <>
                  {isUserDropDown ? (
                    <NavigateMypage>
                      <BsPersonFill style={{ fontSize: '40px' }} />
                    </NavigateMypage>
                  ) : (
                    ''
                  )}
                  <HeaderDropDownListBox style={{ position: 'absolute' }}>
                    <HeaderImageBox>
                      <HeaderImage
                        src={
                          profileUserInfo[0]?.profileImg
                            ? profileUserInfo[0].profileImg
                            : 'https://imhannah.me/common/img/default_profile.png'
                        }
                        alt=""
                      />
                      <HeaderImageText>
                        안녕하세요, {headerNickName ?? '익명'}님🥰
                      </HeaderImageText>
                    </HeaderImageBox>
                    <HeaderDropDownListSection>
                      <DropDownListBody onClick={navigateMyPage}>
                        <HeaderDropDownList>마이페이지</HeaderDropDownList>
                      </DropDownListBody>
                      <DropDownListBody onClick={HeaderLogOut}>
                        <HeaderDropDownList>로그아웃</HeaderDropDownList>
                      </DropDownListBody>
                    </HeaderDropDownListSection>
                  </HeaderDropDownListBox>
                </>
              ) : (
                <NavigateMypage>
                  <BsPersonFill style={{ fontSize: '40px' }} />
                </NavigateMypage>
              )}
            </div>
          ) : (
            ''
          )}

          <LoginRoute onClick={navigateLoginPage}>
            {loginToggle ? '로그인' : ''}
          </LoginRoute>
        </TeamAndLoginBox>
      </HeaderInfoBody>
    </HeaderBody>
  );
};

export default Header;

import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore';
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
  HeaderDropDownListSection,
  DropDownListBody,
  HeaderSearchBox,
  HeaderSearchInput,
  HeaderSearchDropDownListBox,
  HeaderSearchDropDownListSection,
  HeaderSearchXbuttonBox,
  HeaderSearchXbutton,
  HeaderNotiDropDownList,
  HeaderNotiDropDownListBox,
} from './style';
import Search from '../../assets/icon/Icon_Search.png';
import Alarm from '../../assets/icon/Icon_Alarm.png';
import { ImCancelCircle } from 'react-icons/im';
import defaultImg from '../../../src/assets/icon/user.png';
// import NotiBadge from './notification/NotiBadge';

const Header = () => {
  // 헤더 로그인 토글
  const [loginToggle, setLoginToggle] = useState(true);

  // 헤더  토글
  const [headerMyIcon, setHeaderMyIcon] = useState(false);

  // 드랍다운
  const [dropDownClick, setDropDownClick] = useState(false);
  const [searchdropDownClick, setSearchdropDownClick] = useState(false);

  // 헤더 드랍다운 생성유뮤
  const [isUserDropDown, setIsUserDropDown] = useState(false);
  const [isSearchUserDropDown, setIsSearchUserDropDown] = useState(false);

  // 알람 드랍다운
  const [alarmDrop, setAlarmDrop] = useState(false);

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

  // 로그아웃
  const HeaderLogOut = async () => {
    // 구글, 깃헙 기존 정보 입력하기
    if (authService.currentUser.providerData[0].providerId === 'google.com') {
      await setDoc(doc(db, 'google', authService.currentUser.uid), {
        bookmarks: [...profileUserInfo[0]?.bookmarks],
        teamID: [...profileUserInfo[0]?.teamID],
        uid: authService.currentUser.uid,
        profileImg: profileUserInfo[0]?.profileImg,
        moreInfo: {
          u_isRemote: profileUserInfo[0]?.moreInfo.u_isRemote,
          u_location: profileUserInfo[0]?.moreInfo.u_location,
          u_stack: [...profileUserInfo[0]?.moreInfo.u_stack],
          u_time: profileUserInfo[0]?.moreInfo.u_time,
        },
      });
    } else if (
      authService.currentUser.providerData[0].providerId === 'github.com'
    ) {
      await setDoc(doc(db, 'github', authService.currentUser.uid), {
        bookmarks: [...profileUserInfo[0].bookmarks],
        teamID: [...profileUserInfo[0].teamID],
        uid: authService.currentUser.uid,
        profileImg: profileUserInfo[0].profileImg,
        moreInfo: {
          u_isRemote: profileUserInfo[0].moreInfo.u_isRemote,
          u_location: profileUserInfo[0].moreInfo.u_location,
          u_stack: [...profileUserInfo[0].moreInfo.u_stack],
          u_time: profileUserInfo[0].moreInfo.u_time,
        },
      });
    }
    authService.signOut();
    window.location.replace('/');
  };

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
  
  // 알람 드랍다운
  const alarmDropDown = () => {
    if (alarmDrop === false) {
      setAlarmDrop(true);
    } else {
      setAlarmDrop(false);
    }
  };

  return (
    <HeaderBody>
      <HeaderInfoBody>
        <LogoAndMateBox>
          <HeaderLogo onClick={navigateHome}></HeaderLogo>
          <MyCodingMate onClick={navigateMyCodingMate}>
            내 코딩모임
          </MyCodingMate>
        </LogoAndMateBox>
        <TeamAndLoginBox>
          <MakeTeam
            onClick={() => {
              if (!authService.currentUser) {
                alert('로그인이 필요합니다.');
              } else {
                navigate('/write');
              }
            }}
          >
            팀 개설하기
          </MakeTeam>
          {/* <div>
            <img
              src={Alarm}
              alt="alarm"
              style={{ width: '20px', cursor: 'pointer' }}
              onClick={alarmDropDown}
            />
            {alarmDrop ? (
              <HeaderNotiDropDownListBox 
                style={{ position: 'absolute' }}
              >
                <HeaderDropDownListSection style={{padding: '10px'}}>
                  <HeaderNotiDropDownList>
                    <NotiBadge />
                  </HeaderNotiDropDownList>
                </HeaderDropDownListSection>
              </HeaderNotiDropDownListBox>
            ) : (
              ''
            )}
          </div> */}

          <div onClick={searchdropDownHandler}>
            {searchdropDownClick ? (
              <>
                {isSearchUserDropDown ? (
                  <NavigateMypage>
                    <img src={Search} alt="search" style={{ width: '20px' }} />
                  </NavigateMypage>
                ) : (
                  ''
                )}
                <HeaderSearchDropDownListBox style={{ position: 'absolute' }}>
                  <HeaderSearchXbuttonBox>
                    <HeaderSearchXbutton
                      onClick={() => setSearchdropDownClick(false)}
                    >
                      <ImCancelCircle
                        color="white"
                        style={{ fontSize: '20px' }}
                      />
                    </HeaderSearchXbutton>
                  </HeaderSearchXbuttonBox>
                  <HeaderSearchDropDownListSection>
                    <HeaderSearchBox>
                      <img
                        src={Search}
                        alt="search"
                        style={{ width: '20px' }}
                      />
                      <HeaderSearchInput
                        onChange={onChangeSearch}
                        onKeyPress={handleonKeyPress}
                      />
                      {/* <HeaderSearchInputBtn type="button" onClick={onSubmit}>
                        검색
                      </HeaderSearchInputBtn> */}
                    </HeaderSearchBox>
                  </HeaderSearchDropDownListSection>
                  {/* <HeaderSearchDropDownHr /> */}
                </HeaderSearchDropDownListBox>
              </>
            ) : (
              <NavigateMypage>
                <img src={Search} alt="search" style={{ width: '20px' }} />
              </NavigateMypage>
            )}
          </div>

          {headerMyIcon ? (
            <div onClick={dropDownHandler}>
              {dropDownClick ? (
                <>
                  {isUserDropDown ? (
                    <NavigateMypage>
                      <img
                        src={defaultImg}
                        alt="user"
                        style={{
                          fontSize: '40px',
                          width: '40px',
                          height: '40px',
                        }}
                      />
                    </NavigateMypage>
                  ) : (
                    ''
                  )}
                  <HeaderDropDownListBox style={{ position: 'absolute' }}>
                    <HeaderImageBox>
                      <HeaderImage
                        src={profileUserInfo[0]?.profileImg ?? defaultImg}
                        alt="user"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '40px',
                        }}
                      />
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
                  <img
                    src={defaultImg}
                    alt="user"
                    style={{ fontSize: '40px', width: '40px', height: '40px' }}
                  />
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

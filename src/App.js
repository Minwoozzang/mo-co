import Router from './shared/router';
// import { init } from '@amplitude/analytics-browser';
import GlobalStyle from './components/GlobalStyle';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import postState from './recoil/postState';
import usePosts from './hooks/usePost';
import authState from './recoil/authState';
import { authService } from './common/firebase';
import testteamPageState from './recoil/testteamPageState';
import useTestTeam from './hooks/useTestTeam';

// init = apikey, userId 를 받으며 비회원이어도 트레킹할 수 있도록 'user@amplitude.com' 생략
function App() {
  const setAuthState = useSetRecoilState(authState);
  // post 컬렉션
  const setPostState = useSetRecoilState(postState);
  const post = usePosts();
  // console.log(post.data)
  // teamPage 컬렉션
  const setTeamPageState = useSetRecoilState(testteamPageState);
  const teamPage = useTestTeam();
  // console.log(teamPage.data)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setAuthState({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        return;
      }
    });
    setPostState(post.data);
    setTeamPageState(teamPage.data);
  }, [authService.currentUser]);
  
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import userState from './recoil/userState';
import useUser from './hooks/useUser';
import { authService } from './common/firebase';
import GlobalStyle from './components/GlobalStyle';
import useTeamPage from './hooks/useTeamPage';
import authState from './recoil/authState';
import Router from './shared/router';
import teamPageState from './recoil/teamPageState';
import postState from './recoil/postState';
import usePosts from './hooks/usePost';

function App() {
  const setAuthState = useSetRecoilState(authState);
  const setPostState = useSetRecoilState(postState);
  const setTeamPageState = useSetRecoilState(teamPageState);
  const post = usePosts();
  const teamPage = useTeamPage();

  const setUserState = useSetRecoilState(userState);
  const user = useUser();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setAuthState({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isLogin: true,
        });
      } else {
        return;
      }
    });
    setUserState(user.data);

    setPostState(post.data);
    setTeamPageState(teamPage.data);
  }, [post.data, teamPage.data, user.data]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

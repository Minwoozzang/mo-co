import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
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
  // post 컬렉션
  const setPostState = useSetRecoilState(postState);
  const post = usePosts();
  // console.log(post.data)

  const setTeamPageState = useSetRecoilState(teamPageState);
  const teamPage = useTeamPage();

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
  }, [post.data, teamPage.data]);
  
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

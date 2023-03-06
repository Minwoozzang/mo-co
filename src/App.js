import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authService } from './common/firebase';
import GlobalStyle from './components/GlobalStyle';
import usePosts from './hooks/usePost';
import authState from './recoil/authState';
import postState from './recoil/postState';
import Router from './shared/router';

function App() {
  const setAuthState = useSetRecoilState(authState);
  // post 컬렉션
  const setPostState = useSetRecoilState(postState);
  const { data } = usePosts();

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
    setPostState(data);
  }, [authService.currentUser]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

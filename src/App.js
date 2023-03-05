import Router from './shared/router';
import GlobalStyle from './components/GlobalStyle';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import authState from './recoil/authState';
import { authService } from './common/firebase';

function App() {
  const setAuthState = useSetRecoilState(authState);

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
  }, [authService.currentUser]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

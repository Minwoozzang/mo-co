import Router from './shared/router';
import { init } from '@amplitude/analytics-browser';
import GlobalStyle from './components/GlobalStyle';
import { useEffect } from 'react';

// init = apikey, userId 를 받으며 비회원이어도 트레킹할 수 있도록 'user@amplitude.com' 생략
function App() {
  const API_KEY = process.env.REACT_APP_REACT_APP_API_KEY;

  useEffect(() => {
    init(API_KEY);
  }, []);
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

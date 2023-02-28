import Router from './shared/router';
import { init } from '@amplitude/analytics-browser';

import GlobalStyle from './components/GlobalStyle';
import { useEffect } from 'react';

// init = apikey, userId를 받으며 비회원이어도 트레킹할 수 있도록 'user@amplitude.com' 생략
function App() {
  useEffect(() => {
    init('2eb40f7cdcfb1bc9a9258300ca9ad5e7');
  }, []);
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

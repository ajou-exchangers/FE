import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import React from 'react';
import Layout from './components/commons/layout';
import RouteList from './components/commons/routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  //prettier-ignore
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <RouteList isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        </Layout>
      </Router>
    </RecoilRoot>
  );
}

export default App;
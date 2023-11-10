import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Layout from './components/commons/layout';
import RouteList from './components/commons/routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  //prettier-ignore
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <RouteList />
        </Layout>
      </Router>
    </RecoilRoot>
  )
}

export default App;

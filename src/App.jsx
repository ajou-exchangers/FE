import Layout from './components/commons/layout';
import RouteList from './components/commons/routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  //prettier-ignore
  return (
    <Router>
      <Layout>
        <RouteList />
        <div>컨텐츠</div>
      </Layout>
    </Router>
  )
}

export default App;

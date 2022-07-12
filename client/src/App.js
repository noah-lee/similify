// Libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import ResetCSS from './styles/reset.css';
import GlobalCSS from './styles/global.css';
import Header from './components/Header';
import Footer from './components/Footer';

// Routes
import Home from './pages/Home';
import Result from './pages/Result';
import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <ResetCSS />
      <GlobalCSS />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track/:seedId" element={<Result />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

const Main = styled.main`
  flex: 1;
`;

export default App;

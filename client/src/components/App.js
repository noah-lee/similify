// Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Components
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import Result from "./Result";
import About from "./About";
import Footer from "./Footer";
import NotFound from "./NotFound";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
        <Header />
        <Main className='content'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
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

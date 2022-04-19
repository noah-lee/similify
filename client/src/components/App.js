import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

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
      <TopContainer>
        <Header />
        <MainContainer>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainContainer>
        <Footer />
      </TopContainer>
    </BrowserRouter>
  );
}

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  position: relative;
  flex: 1;
`;

export default App;

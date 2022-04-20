import { Link } from 'react-router-dom';
import styled from "styled-components";

import { ReactComponent as SimilifyLogo } from "../assets/similify_logo.svg";

import Search from "./Search";
import PopularSearches from "./PopularSearches";

const Homepage = () => {
  return (
    <Wrapper>
      <LogoContainer to="/">
        <SimilifyLogo width="64" height="64" />
        <Name>Similify</Name>
      </LogoContainer>
      <Instructions>
        Find songs with similar <br />
        <Accent>BPM</Accent>
        {" & "}
        <Accent>key</Accent>
      </Instructions>
      <Search />
      <PopularSearches />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 64px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

const LogoContainer = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 3.6rem;
  gap: 8px;
`;

const Name = styled.h1``;

const Instructions = styled.p`
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
`;

const Accent = styled.span`
  font-weight: bold;
  color: var(--color-orange-accent);
`;

export default Homepage;

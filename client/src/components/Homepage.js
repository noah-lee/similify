import styled from "styled-components";

import Search from "./Search";
import PopularSearches from "./PopularSearches";

const Homepage = () => {
  return (
    <Wrapper>
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
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
  position: absolute;
  top: 64px;
`;

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

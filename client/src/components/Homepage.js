// Libraries
import styled from "styled-components";

// Components
import Logo from './Logo';
import Search from "./Search";

const Homepage = () => {
  return (
    <Wrapper>
      <Logo />
      <Instructions>
        Find songs with similar <br />
        <Accent>BPM</Accent>
        {" & "}
        <Accent>key</Accent>
      </Instructions>
      <Search />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
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

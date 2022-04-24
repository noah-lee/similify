// Libraries
import { useContext } from "react";
import styled from "styled-components";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import Connect from "./Connect";
import Disconnect from "./Disconnect";
import DisplayName from "./DisplayName";

const Header = () => {
  const { accessToken } = useContext(SpotifyContext);

  return (
    <Wrapper className="header">
      <HeaderContainer>
        {accessToken ? (
          <>
            <DisplayName />
            <Disconnect />
          </>
        ) : (
          <Connect />
        )}
      </HeaderContainer>
    </Wrapper>
  );
};

const Wrapper = styled.header``;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 96px;
  margin: 0 auto;
  padding: 16px 32px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-weight: bold;
`;

export default Header;

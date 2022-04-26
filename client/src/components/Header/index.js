// Libraries
import { useContext } from "react";
import styled from "styled-components";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import Connect from "./Connect";
import Disconnect from "./Disconnect";
import DisplayName from "./DisplayName";

const Header = () => {
  const { userAuthHeaders } = useContext(SpotifyContext);

  return (
    <Wrapper className="header">
      <HeaderContainer>
        {userAuthHeaders ? (
          <>
            {/* <DisplayName /> */}
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
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;

  font-weight: bold;
`;

export default Header;

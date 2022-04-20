import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { SpotifyContext } from "../contexts/SpotifyContext";

import { ReactComponent as SimilifyLogo } from "../assets/similify_logo.svg";

import LogIn from "./LogIn";
import LogOut from "./LogOut";
import DisplayName from "./DisplayName";

const Header = () => {
  const { accessToken } = useContext(SpotifyContext);

  console.log("accessToken:");
  console.log(accessToken);

  return (
    <Wrapper>
      <Brand to="/">
        <SimilifyLogo width="56" height="56" />
        <Name>Similify</Name>
      </Brand>
      <Container>
        {accessToken ? (
          <>
            <DisplayName />
            <LogOut />
          </>
        ) : (
          <LogIn />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-dark-contrast);
  height: 96px;
  padding: 16px 32px;
  line-height: 32px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Brand = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  gap: 8px;
  /* &:focus  {
    outline: solid;
  } */
`;

const Name = styled.h1``;

export default Header;

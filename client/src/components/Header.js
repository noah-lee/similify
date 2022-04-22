import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { SpotifyContext } from "../contexts/SpotifyContext";

import { ReactComponent as SimilifyLogo } from "../assets/similify_logo.svg";

import Connect from "./Connect";
import Disconnect from "./Disconnect";
import DisplayName from "./DisplayName";

const Header = () => {
  const { accessToken } = useContext(SpotifyContext);

  return (
    <Wrapper>
        {/* {accessToken ? (
          <>
            <DisplayName />
            <Disconnect />
          </>
        ) : (
          <Connect />
        )} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 96px;
  padding: 16px 32px;
  line-height: 32px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: none;
`;

const LogoContainer = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  gap: 8px;
`;

const Name = styled.h1``;

export default Header;

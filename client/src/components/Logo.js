import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as SimilifyLogo } from "../assets/similify_logo.svg";

const Logo = () => {
  return (
    <StyledLink to="/">
      <SimilifyLogo width="64" height="64" />
      <Name>Similify</Name>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 3.6rem;
  gap: 8px;
`;

const Name = styled.h1``;

export default Logo;

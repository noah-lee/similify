// Libraries
import { Link } from "react-router-dom";
import styled from "styled-components";

// Misc.
import { ReactComponent as SimilifyLogo } from "../assets/similify_logo.svg";

const Logo = () => {
  return (
    <StyledLink to="/" aria-label='Link back to homepage'>
      <SimilifyLogo width="64" height="64" aria-label="Similify icon"/>
      <Name aria-label="Website name">Similify</Name>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  display: flex;
  align-items: center;
  gap: 8px;

  &:focus {
    outline: auto var(--color-orange-accent);
  }
`;

const Name = styled.h1`
  font-weight: bold;
  font-size: 3.6rem;
`;

export default Logo;

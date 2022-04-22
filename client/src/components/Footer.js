import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiInfo, FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <Wrapper>
      <LinkContainer>
        <StyledLink to="/about">
          <FiInfo />
          <p>About</p>
        </StyledLink>
        <StyledA href="https://github.com/noah-lee/similify" target="_blank">
          <FiGithub />
          <p>GitHub</p>
        </StyledA>
      </LinkContainer>
      <SpotifyText>
        Create by Noah Lee, powered by{" "}
        <SpotifyA href="http://spotify.com/" target="_blank">
          Spotify
        </SpotifyA>
      </SpotifyText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-dark-contrast);
  height: 96px;
  padding: 16px 32px;
  font-weight: bold;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const LinkContainer = styled.div`
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: var(--color-orange-accent);
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    color: var(--color-orange-accent);
  }
`;

const SpotifyText = styled.p`
  color: gray;
  font-weight: normal;
  font-size: 12px;
`;

const SpotifyA = styled.a`
  text-decoration: none;
  color: var(--color-orange-accent);
`;

export default Footer;

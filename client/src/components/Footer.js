import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiInfo, FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <Wrapper className="footer">
      <FooterContainer>
        <FooterLinks>
          <StyledLink to="/about">
            <FiInfo />
            <p>About</p>
          </StyledLink>
          <StyledA href="https://github.com/noah-lee/similify" target="_blank">
            <FiGithub />
            <p>GitHub</p>
          </StyledA>
        </FooterLinks>
        <FooterText>
          Created by Noah Lee, powered by{" "}
          <SpotifyA href="http://spotify.com/" target="_blank">
            Spotify
          </SpotifyA>
        </FooterText>
      </FooterContainer>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: var(--color-dark-contrast);
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 96px;
  margin: 0 auto;
  padding: 16px 32px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  font-weight: bold;
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
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: var(--color-orange-accent);
  }
`;

const FooterText = styled.p`
  color: gray;
  font-size: 12px;
`;

const SpotifyA = styled.a`
  text-decoration: none;
  color: var(--color-orange-accent);
`;

export default Footer;

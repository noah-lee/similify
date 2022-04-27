// Libraries
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiInfo, FiGithub } from "react-icons/fi";

// Misc.
import spotifyLogoGreen from "../assets/Spotify_Logo_RGB_Green.png";

const Footer = () => {
  return (
    <Wrapper className="footer">
      <FooterContainer>
        <FooterLinks>
          {/* <StyledLink to="/about">
            <FiInfo />
            <p>About</p>
          </StyledLink> */}
          <StyledA href="https://github.com/noah-lee/similify" target="_blank">
            <FiGithub />
            <p>GitHub</p>
          </StyledA>
        </FooterLinks>
        <FooterTextContainer>
          <FooterText>Created by Noah Lee, powered by</FooterText>
          <SpotifyA href="http://spotify.com/" target="_blank">
            <img src={spotifyLogoGreen} width="70px" alt="Spotify logo" />
          </SpotifyA>
        </FooterTextContainer>
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
  padding: 16px;

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

  &:hover,
  &:focus {
    color: var(--color-orange-accent);
  }

  &:focus {
    outline: auto var(--color-orange-accent);
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 4px;

  &:hover,
  &:focus {
    color: var(--color-orange-accent);
  }

  &:focus {
    outline: auto var(--color-orange-accent);
  }
`;

const FooterTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const FooterText = styled.p`
  color: gray;
  font-size: 12px;
`;

const SpotifyA = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;

  text-decoration: none;
  font-size: 12px;
  color: #1ed760;

  &:focus {
    outline: auto var(--color-orange-accent);
  }
`;

export default Footer;

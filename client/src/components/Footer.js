// Libraries
import styled from 'styled-components';
import { FiGithub } from 'react-icons/fi';

// Misc.
import spotifyLogoGreen from '../assets/Spotify_Logo_RGB_Green.png';

const Footer = () => {
  return (
    <Wrapper className="footer">
      <Container>
        <Links>
          <StyledLink
            href="https://github.com/noah-lee/similify"
            target="_blank"
          >
            <FiGithub />
            <p>GitHub</p>
          </StyledLink>
        </Links>
        <Notes>
          <Text>Created by Noah Lee, powered by</Text>
          <SpotifyLink href="http://spotify.com/" target="_blank">
            <img src={spotifyLogoGreen} width="70px" alt="Spotify logo" />
          </SpotifyLink>
        </Notes>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: var(--color-dark-contrast);
`;

const Container = styled.div`
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

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  font-weight: bold;
`;

const StyledLink = styled.a`
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

const Notes = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Text = styled.p`
  color: gray;
  font-size: 14px;
`;

const SpotifyLink = styled.a`
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

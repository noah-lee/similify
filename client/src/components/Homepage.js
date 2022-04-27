// Libraries
import styled from "styled-components";

// Components
import Logo from "./Logo";
import Search from "./Search";

// Misc.
import spotifyLogoWhite from "../assets/Spotify_Logo_RGB_White.png";

const Homepage = () => {
  return (
    <Wrapper>
      <Logo />
      <Instructions>
        <SpotifyLogo src={spotifyLogoWhite} />
        <Text>Search & Discover</Text>
        <Text>
          with <Accent>BPM</Accent> & <Accent>key</Accent>
        </Text>
      </Instructions>
      <Search />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;

const Instructions = styled.div`
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
`;

const SpotifyLogo = styled.img`
  width: 128px;
`;

const Text = styled.p``;

const Accent = styled.span`
  font-weight: bold;
  color: var(--color-orange-accent);
`;

export default Homepage;

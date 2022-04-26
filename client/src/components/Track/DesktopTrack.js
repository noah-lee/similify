import { useContext } from "react";
import styled from "styled-components";

import { SpotifyContext } from "../../contexts/SpotifyContext";

import spotifyIconWhite from "../../assets/Spotify_Icon_RGB_White.png";
import { FiHeart } from "react-icons/fi";
import { msToMinSec } from "../../utils/time";
import { toLetterKey, toCamelotKey } from "../../utils/key";

const DesktopTrack = ({
  track,
  features,
  showCamelot,
  isSeed,
  handleTrackClick,
  handleArtClick,
  keyStyle,
  heartStyle,
  handleHeartClick,
}) => {
  const { userAuthHeaders } = useContext(SpotifyContext);

  return (
    <TrackArea onClick={handleTrackClick} isSeed={isSeed}>
      <TrackLink
        href={"https://open.spotify.com/track/" + track.id}
        target="_blank"
      >
        <TrackArt src={track.album.images[2].url} height="48px" />
        <TrackSpotifyOverlay onClick={handleArtClick}>
          <SpotifyLogo src={spotifyIconWhite} />
        </TrackSpotifyOverlay>
      </TrackLink>
      <TrackTitle>
        <TrackName>{track.name}</TrackName>
        <TrackArtists>
          {track.artists.map((artist) => artist.name).join(", ")}
        </TrackArtists>
      </TrackTitle>
      <TrackTime>{msToMinSec(track.duration_ms)}</TrackTime>

      <TrackBpm>{features.tempo.toFixed()}</TrackBpm>
      <TrackKey style={keyStyle}>
        {showCamelot
          ? toCamelotKey(features.key, features.mode)
          : toLetterKey(features.key, features.mode)}
      </TrackKey>

      <TrackIsSaved
        onClick={handleHeartClick}
        disabled={userAuthHeaders ? false : true}
      >
        <FiHeart size="20px" style={heartStyle} />
      </TrackIsSaved>
    </TrackArea>
  );
};

const TrackArea = styled.div`
  cursor: ${(props) => (props.isSeed ? "auto" : "pointer")};

  width: 100%;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  align-items: center;

  gap: 16px;

  background-color: var(--color-dark-contrast);

  &:hover {
    background-color: ${(props) =>
      props.isSeed ? "var(--color-dark-contrast)" : "var(--color-dark-light)"};
  }
`;

const TrackLink = styled.a`
  position: relative;
  width: 48px;
  height: 48px;
`;

const TrackSpotifyOverlay = styled.button`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #f3f3f3;
  opacity: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 1;
  }
`;

const TrackArt = styled.img``;

const SpotifyLogo = styled.img`
  width: 24px;
`;

const TrackTitle = styled.div`
  flex: 1;
  min-width: 160px;

  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

const TrackName = styled.p``;

const TrackArtists = styled.p`
  font-weight: 400;
  color: gray;
`;

const TrackTime = styled.p`
  width: 48px;
`;

const TrackBpm = styled.p`
  width: 48px;
`;

const TrackKey = styled.p`
  width: 64px;
`;

const TrackIsSaved = styled.button`
  width: 48px;
  height: 20px;
`;

export default DesktopTrack;

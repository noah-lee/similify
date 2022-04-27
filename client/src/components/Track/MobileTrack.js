import { useContext } from "react";
import styled from "styled-components";

import { SpotifyContext } from "../../contexts/SpotifyContext";

import spotifyIconWhitePath from "../../assets/Spotify_Icon_RGB_White.png";
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
    <TrackArea
      isSeed={isSeed}
      aria-label={`Click to search using this track: ${
        track.name
      } by ${track.artists
        .map((artist) => artist.name)
        .join(", ")}, Time: ${msToMinSec(
        track.duration_ms
      )}, BPM: ${features.tempo.toFixed()}, Key: ${
        showCamelot
          ? toCamelotKey(features.key, features.mode)
          : toLetterKey(features.key, features.mode)
      }`}
    >
      <TrackTopContainer>
        <TrackLink
          onClick={handleTrackClick}
          target="_blank"
          aria-labe="Open song on Spotify website and play if connected"
        >
          <TrackArt src={track.album.images[2].url} height="48px" alt='Track album art'/>
          <TrackSpotifyOverlay onClick={handleArtClick}>
            <SpotifyLogo src={spotifyIconWhitePath} />
          </TrackSpotifyOverlay>
        </TrackLink>
        <TrackTitle>
          <TrackName>{track.name}</TrackName>
          <TrackArtists>
            {track.artists.map((artist) => artist.name).join(", ")}
          </TrackArtists>
        </TrackTitle>
        <TrackIsSaved
          onClick={handleHeartClick}
          style={{ pointerEvents: userAuthHeaders ? "inherit" : "none" }}
          aria-label="Add or remove song from Spotify saved list, if connected"
        >
          <FiHeart size="20px" style={heartStyle} />
        </TrackIsSaved>
      </TrackTopContainer>
      <TrackBottomContainer>
        <TrackBpm>
          {features.tempo.toFixed()}
          <p style={{ color: "grey" }}>BPM</p>
        </TrackBpm>
        <TrackKey style={keyStyle}>
          {showCamelot
            ? toCamelotKey(features.key, features.mode)
            : toLetterKey(features.key, features.mode)}
          <p style={{ color: "grey" }}>Key</p>
        </TrackKey>
        <TrackTime>
          {msToMinSec(track.duration_ms)}
          <p style={{ color: "grey" }}>Time</p>
        </TrackTime>
      </TrackBottomContainer>
    </TrackArea>
  );
};

const TrackArea = styled.li`
  width: 100%;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;

  gap: 16px;

  background-color: var(--color-dark-contrast);

  /* &:hover {
    background-color: ${(props) =>
      props.isSeed ? "var(--color-dark-contrast)" : "var(--color-dark-light)"};
  } */
`;

const TrackTopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const TrackBottomContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
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
  /* min-width: 160px; */

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

const TrackTime = styled.div`
  width: 48px;
`;

const TrackBpm = styled.div`
  width: 48px;
  margin-left: 64px;
`;

const TrackKey = styled.div`
  flex: 1;
`;

const TrackIsSaved = styled.button`
  width: 48px;
  height: 20px;
`;

export default DesktopTrack;

// Libraries
import { useContext } from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";

// Misc.
import spotifyIconWhitePath from "../../assets/Spotify_Icon_RGB_White.png";
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
  localIsSaved,
}) => {
  const { userAuthHeaders } = useContext(SpotifyContext);

  return (
    <TrackArea isSeed={isSeed}>
      <TrackTopContainer>
        <TrackLink
          onClick={handleArtClick}
          aria-label={`Open ${track.name} by ${track.artists
            .map((artist) => artist.name)
            .join(", ")} on Spotify website and play if connected`}
        >
          <TrackArt
            src={track.album.images[2].url}
            height="48px"
            alt="Track album art"
          />
          <TrackSpotifyOverlay>
            <SpotifyLogo src={spotifyIconWhitePath} />
          </TrackSpotifyOverlay>
        </TrackLink>
        <TrackTitle
          onClick={handleTrackClick}
          tabIndex={isSeed ? "-1" : "auto"}
          style={{ pointerEvents: isSeed ? "none" : "inherit" }}
          aria-label={
            isSeed
              ? "Searched track"
              : `Search using ${track.name} by ${track.artists
                  .map((artist) => artist.name)
                  .join(", ")}`
          }
        >
          <TrackName>{track.name}</TrackName>
          <TrackArtists>
            {track.artists.map((artist) => artist.name).join(", ")}
          </TrackArtists>
        </TrackTitle>
        <TrackIsSaved
          onClick={handleHeartClick}
          style={{ pointerEvents: userAuthHeaders ? "inherit" : "none" }}
          tabIndex={userAuthHeaders ? "auto" : "-1"}
          aria-label={`${
            localIsSaved ? "Remove song from" : "Add song to"
          } your Spotify saved list`}
          aria-hidden={userAuthHeaders ? false : true}
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

const TrackLink = styled.button`
  position: relative;
  width: 48px;
  height: 48px;

  &:focus {
    outline: auto var(--color-orange-accent);
  }
`;

const TrackSpotifyOverlay = styled.div`
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

const TrackTitle = styled.button`
  flex: 1;
  /* min-width: 160px; */

  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;

  &:hover,
  &:focus {
    color: var(--color-orange-accent);
  }

  &:focus {
    outline: auto var(--color-orange-accent);
  }
`;

const TrackName = styled.p`
  text-align: left;
`;

const TrackArtists = styled.p`
  text-align: left;
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

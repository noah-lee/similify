import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";

import spotifyLogoWhitePath from "../assets/Spotify_Icon_RGB_White.png";

import { msToMinSec } from "../utils/time";
import { toLetterKey, toCamelotKey, toColor } from "../utils/key";

const SeedTrack = ({ seed, seedFeatures, showCamelot }) => {
  // const [saved, setSaved] = useState("");

  // // Check if seed track is saved
  // useEffect(() => {
  //   const checkSaved = async () => {
  //     const res = await axios(
  //       "/api/check-saved-tracks?" +
  //         new URLSearchParams({
  //           ids: seed.id,
  //         })
  //     );
  //     setSaved(res.data[0]);
  //   };
  //   checkSaved();
  // }, [seed]);

  // // Heart styling
  // const heartStyle = {
  //   color: saved ? "var(--color-orange-accent)" : "gray",
  //   fill: saved ? "var(--color-orange-accent)" : "none",
  // };

  // // Handle heart click
  // const handleHeartClick = () => {
  //   if (saved) {
  //     axios.delete(
  //       "/api/remove-track?" + new URLSearchParams({ ids: seed.id })
  //     );
  //   } else {
  //     axios.put("/api/save-track?" + new URLSearchParams({ ids: seed.id }));
  //   }
  //   setSaved((prevState) => !prevState);
  // };

  // // Handle art click
  // const handleArtClick = (ev) => {
  //   ev.stopPropagation();
  //   axios.put("/api/play", {
  //     context_uri: seed.album.uri,
  //     offset: {
  //       position: seed.track_number - 1,
  //     },
  //   });
  // };

  return (
    <TrackArea>
      <TrackNumber>🌱</TrackNumber>
      <TrackLink
        href={"https://open.spotify.com/track/" + seed.id}
        target="_blank"
      >
        <TrackArt src={seed.album.images[2].url} height="48px" />
        <TrackUri /*onClick={handleArtClick}*/>
          <SpotifyLogo src={spotifyLogoWhitePath} />
        </TrackUri>
      </TrackLink>
      <TrackTitle>
        <TrackName>{seed.name}</TrackName>
        <TrackArtists>
          {seed.artists.map((artist) => artist.name).join(", ")}
        </TrackArtists>
      </TrackTitle>
      <TrackTime>{msToMinSec(seed.duration_ms)}</TrackTime>
      <TrackBpm>{seedFeatures.tempo.toFixed()}</TrackBpm>
      <TrackKey
        style={{
          color: `${toColor(seedFeatures.key, seedFeatures.mode)}`,
        }}
      >
        {showCamelot
          ? toCamelotKey(seedFeatures.key, seedFeatures.mode)
          : toLetterKey(seedFeatures.key, seedFeatures.mode)}
      </TrackKey>
      {/* <TrackIsSaved onClick={handleHeartClick}>
        <FiHeart size="20px" style={heartStyle} />
      </TrackIsSaved> */}
    </TrackArea>
  );
};

const TrackArea = styled.div`
  display: grid;
  grid-template-columns: 32px 48px 257px 48px 48px 64px; //20px;
  gap: 16px;
  padding: 16px;
  background-color: var(--color-dark-contrast);
  align-items: center;
`;

const TrackNumber = styled.p``;

const TrackLink = styled.a`
  position: relative;
  height: 48px;
`;

const TrackUri = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
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

const SpotifyLogo = styled.img`
  width: 24px;
`;

const TrackArt = styled.img``;
const TrackTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TrackName = styled.p``;
const TrackArtists = styled.p`
  font-weight: 400;
  color: gray;
`;
const TrackTime = styled.p``;
const TrackBpm = styled.p``;
const TrackKey = styled.p``;

// const TrackIsSaved = styled.button``;

export default SeedTrack;

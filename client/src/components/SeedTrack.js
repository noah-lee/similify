import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FiPlay } from "react-icons/fi";

import { msToMinSec } from "../utils/time";
import { toLetterKey, toCamelotKey, toColor } from "../utils/key";

const SeedTrack = ({ seed, seedFeatures, showCamelot }) => {

  return (
    <TrackArea>
      <TrackNumber>🌱</TrackNumber>
      <TrackLink>
        <TrackArt src={seed.album.images[2].url} height="48px" />
        <TrackUri href={seed.uri}>
          <FiPlay size="20px" fill="#f3f3f3" />
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
          color: `${toColor(
            seedFeatures.key,
            seedFeatures.mode
          )}`,
        }}
      >
        {showCamelot
          ? toCamelotKey(seedFeatures.key, seedFeatures.mode)
          : toLetterKey(seedFeatures.key, seedFeatures.mode)}
      </TrackKey>
    </TrackArea>
  );
};

const TrackArea = styled.div`
  display: grid;
  grid-template-columns: 20px 48px 257px 48px 48px 64px;
  gap: 16px;
  padding: 16px;
  background-color: var(--color-dark-contrast);
  align-items: center;
`;

const TrackNumber = styled.p``;

const TrackLink = styled.div`
  position: relative;
`;

const TrackUri = styled.a`
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

const spin = keyframes`
  0% { transform: rotate(0deg)}
  100% { transform: rotate(360deg)}
`;

export default SeedTrack;

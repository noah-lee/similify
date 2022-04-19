import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { FiPlay } from "react-icons/fi";
import { ReactComponent as SimilifyLoader } from "../assets/similify_loader.svg";

import { SpotifyContext } from "../contexts/SpotifyContext";

import Loader from "./Loader";

import { msToMinSec } from "../utils/time";
import { toLetterKey, toCamelotKey, toColor } from "../utils/key";

const Track = ({ track, number, camelotMatches, showCamelot }) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(SpotifyContext);
  const [features, setFeatures] = useState("");

  // Get result track data
  useEffect(() => {
    const getFeatures = async () => {
      try {
        const res = await axios(`/api/audio-features/${track.id}`, {
          headers: {
            access_token: accessToken,
          },
        });
        setFeatures(res.data);
      } catch (err) {
        window.alert(err.response.data.message);
        setAccessToken("");
        navigate("/");
        window.location.reload(false);
      }
    };
    getFeatures();
  }, [track]);

  return (
    <>
      {features ? (
        <TrackArea>
          <TrackNumber>{number}</TrackNumber>
          <TrackLink>
            <TrackArt src={track.album.images[2].url} height="48px" />
            <TrackUri href={track.uri}>
              <FiPlay size="20px" fill="#f3f3f3" />
            </TrackUri>
          </TrackLink>
          <TrackTitle>
            <TrackName>{track.name}</TrackName>
            <TrackArtists>
              {track.artists.map((artist) => artist.name).join(", ")}
            </TrackArtists>
          </TrackTitle>
          <TrackTime>{msToMinSec(track.duration_ms)}</TrackTime>
          <TrackBpm>{features.tempo.toFixed()}</TrackBpm>
          <TrackKey
            style={{
              color: `${
                showCamelot &&
                !camelotMatches
                  .map((match) => JSON.stringify(match))
                  .includes(
                    JSON.stringify({ key: features.key, mode: features.mode })
                  )
                  ? "gray"
                  : toColor(features.key, features.mode)
              }`,
            }}
          >
            {showCamelot
              ? toCamelotKey(features.key, features.mode)
              : toLetterKey(features.key, features.mode)}
          </TrackKey>
        </TrackArea>
      ) : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </>
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
  height: 48px;
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
const TrackGenres = styled.p``;
const TrackBpm = styled.p``;
const TrackKey = styled.p``;

const LoaderContainer = styled.div`
  padding: 16px;
`;

export default Track;

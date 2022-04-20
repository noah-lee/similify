import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FiPlay, FiHeart } from "react-icons/fi";

import { SpotifyContext } from "../contexts/SpotifyContext";

import Loader from "./Loader";

import { msToMinSec } from "../utils/time";
import { toLetterKey, toCamelotKey, toColor } from "../utils/key";

const Track = ({ track, number, camelotMatches, showCamelot }) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setSeed } = useContext(SpotifyContext);
  const [features, setFeatures] = useState("");
  const [saved, setSaved] = useState(track.saved);

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
        setAccessToken("");
        navigate("/");
      }
    };
    getFeatures();
  }, [track]);

  // Heart styling
  const heartStyle = {
    color: saved ? "var(--color-orange-accent)" : "gray",
    fill: saved ? "var(--color-orange-accent)" : "none",
  };

  // Handle heart click
  const handleHeartClick = (ev) => {
    ev.stopPropagation();
    if (saved) {
      axios.delete(
        "/api/remove-track?" + new URLSearchParams({ ids: track.id })
      );
    } else {
      axios.put("/api/save-track?" + new URLSearchParams({ ids: track.id }));
    }
    setSaved((prevState) => !prevState);
  };

  // Handle track click
  const handleTrackClick = () => {
    axios.post("/api/popular-searches", {
      track,
    });

    setSeed(track);
  };

  // Handle art click
  const handleArtClick = (ev) => {
    ev.stopPropagation();
    axios.put("/api/play", {
      context_uri: track.album.uri,
      offset: {
        position: track.track_number - 1,
      },
    });
  };

  return (
    <>
      {features ? (
        <TrackArea onClick={handleTrackClick}>
          <TrackNumber>{number}</TrackNumber>
          <TrackLink>
            <TrackArt src={track.album.images[2].url} height="48px" />
            <TrackUri onClick={handleArtClick}>
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
          <TrackIsSaved onClick={handleHeartClick}>
            <FiHeart size="20px" style={heartStyle} />
          </TrackIsSaved>
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
  grid-template-columns: 32px 48px 257px 48px 48px 64px 20px;
  gap: 16px;
  padding: 16px;
  background-color: var(--color-dark-contrast);
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color-dark-light);
  }
`;

const TrackNumber = styled.p``;

const TrackLink = styled.div`
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

const LoaderContainer = styled.div`
  padding: 16px;
`;

const TrackIsSaved = styled.button``;

export default Track;

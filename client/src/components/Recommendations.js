import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { SpotifyContext } from "../contexts/SpotifyContext";

import Track from "./Track";
import Loader from "./Loader";

import { toKeyModeMatches } from "../utils/key";

const Recommendations = ({
  seed,
  seedFeatures,
  bpmRange,
  keyRange,
  camelotMatches,
  showCamelot,
  refresh,
}) => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken, MAX_BPM_RANGE } =
    useContext(SpotifyContext);
  const [recommendations, setRecommendations] = useState("");

  const [load, setLoad] = useState(10);
  const [wait, setWait] = useState(false);

  //Get result tracks
  useEffect(() => {
    const getRecommendations = async () => {
      setRecommendations("");
      setLoad(10);
      const keyMode = toKeyModeMatches(
        seedFeatures.key,
        seedFeatures.mode,
        keyRange
      );
      const defaultParams = new URLSearchParams({
        limit: 100,
        seed_tracks: seed.id,
        seed_artists: seed.artists.slice(0, 4).map((artist) => artist.id),
        min_tempo:
          bpmRange === MAX_BPM_RANGE
            ? 0
            : Number(seedFeatures.tempo.toFixed()) - bpmRange - 0.49,
        max_tempo:
          bpmRange === MAX_BPM_RANGE
            ? 200
            : Number(seedFeatures.tempo.toFixed()) + bpmRange + 0.49,
        // target_acousticness: seedFeatures.acousticness,
        target_danceability: seedFeatures.danceability,
        target_energy: seedFeatures.energy,
        // target_instrumentalness: seedFeatures.instrumentalness,
        // target_liveness: seedFeatures.liveness,
        // target_loudness: seedFeatures.loudness,
        // target_speechiness: seedFeatures.speechiness,
        target_time_signature: seedFeatures.time_signature,
        target_valence: seedFeatures.valence,
      });
      try {
        const majLowRes = await axios(
          "/api/recommendations?" +
            defaultParams +
            "&" +
            new URLSearchParams({
              min_key: keyMode.major.lower[0],
              max_key: keyMode.major.lower[1],
              min_mode: keyMode.major.mode,
              max_mode: keyMode.major.mode,
            }),
          {
            headers: {
              access_token: accessToken,
            },
          }
        );
        const majUpRes = await axios(
          "/api/recommendations?" +
            defaultParams +
            "&" +
            new URLSearchParams({
              min_key: keyMode.major.upper[0],
              max_key: keyMode.major.upper[1],
              min_mode: keyMode.major.mode,
              max_mode: keyMode.major.mode,
            }),
          {
            headers: {
              access_token: accessToken,
            },
          }
        );
        const minLowRes = await axios(
          "/api/recommendations?" +
            defaultParams +
            "&" +
            new URLSearchParams({
              min_key: keyMode.minor.lower[0],
              max_key: keyMode.minor.lower[1],
              min_mode: keyMode.minor.mode,
              max_mode: keyMode.minor.mode,
            }),
          {
            headers: {
              access_token: accessToken,
            },
          }
        );
        const minUpRes = await axios(
          "/api/recommendations?" +
            defaultParams +
            "&" +
            new URLSearchParams({
              min_key: keyMode.minor.upper[0],
              max_key: keyMode.minor.upper[1],
              min_mode: keyMode.minor.mode,
              max_mode: keyMode.minor.mode,
            }),
          {
            headers: {
              access_token: accessToken,
            },
          }
        );
        // Combine all key & mode responses
        const combinedRecommendations =
          keyRange === 0
            ? [...majLowRes.data.tracks, ...minLowRes.data.tracks]
            : [
                ...majLowRes.data.tracks,
                ...majUpRes.data.tracks,
                ...minLowRes.data.tracks,
                ...minUpRes.data.tracks,
              ];
        // Remove same tracks as seed
        const filteredRecommendations = combinedRecommendations.filter(
          (track) => track.external_ids.isrc !== seed.external_ids.isrc
        );
        // Sort by popularity
        const sortedRecommendations = filteredRecommendations.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        console.log(sortedRecommendations);
        setRecommendations(sortedRecommendations);
      } catch (err) {
        window.alert(err.response.data.message);
        setAccessToken("");
        navigate("/");
        window.location.reload(false);
      }
    };
    getRecommendations();
  }, [seed, seedFeatures, refresh]);

  // Load more recommendations (2 seconds delay)
  const handleLoadMoreClick = async () => {
    setLoad((prevState) => prevState + 10);
    setWait(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setWait(false);
  };

  // useEffect(() => {
  //   const getLiked = async () => {
  //     const res = await axios("/api/saved", {
  //       headers: {
  //         access_token: accessToken,
  //       },
  //     });
  //     console.log(res.data);
  //   };
  //   getLiked();
  // }, []);

  return (
    <Wrapper>
      {recommendations ? (
        <>
          <Title>Recommendations</Title>
          {recommendations.slice(0, load).map((recommendation, index) => (
            <Track
              key={recommendation.id}
              track={recommendation}
              number={index + 1}
              camelotMatches={camelotMatches}
              showCamelot={showCamelot}
            />
          ))}
          {load <= recommendations.length ? (
            <>
              {wait ? (
                <Wait>Wait...</Wait>
              ) : (
                <LoadMore onClick={handleLoadMoreClick}>Load More</LoadMore>
              )}
            </>
          ) : (
            <LoadEnd>End</LoadEnd>
          )}
        </>
      ) : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h2`
  font-weight: bold;
  padding: 16px;
  width: 596px;
`;

const LoadMore = styled.button`
  font-weight: bold;
  width: 100%;
  height: 48px;
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: var(--color-dark-contrast);

  &:hover {
    background-color: #282828;
    color: var(--color-orange-accent);
  }
`;

const Wait = styled.p`
  font-weight: bold;
  width: 100%;
  height: 48px;
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: var(--color-dark-contrast);
`;

const LoadEnd = styled.p`
  font-weight: bold;
  width: 100%;
  height: 48px;
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: var(--color-dark-contrast);
`;

const LoaderContainer = styled.div`
  padding: 16px;
`;

export default Recommendations;

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

  const { setAccessToken, MAX_BPM_RANGE } =
    useContext(SpotifyContext);

  const [recommendations, setRecommendations] = useState("");
  const [load, setLoad] = useState(10);

  //Get recommendations tracks
  useEffect(() => {
    const getRecommendations = async () => {
      // Reset recommendations
      setRecommendations("");
      // Reset Load to 10
      setLoad(10);
      const keyModeMatches = toKeyModeMatches(
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
        target_acousticness: seedFeatures.acousticness,
        target_danceability: seedFeatures.danceability,
        target_energy: seedFeatures.energy,
        target_instrumentalness: seedFeatures.instrumentalness,
        target_liveness: seedFeatures.liveness,
        target_loudness: seedFeatures.loudness,
        target_speechiness: seedFeatures.speechiness,
        target_time_signature: seedFeatures.time_signature,
        target_valence: seedFeatures.valence,
      });
      try {
        // Get combined recommendations
        const combinedRecommendations = [];
        for (let match of keyModeMatches) {
          const lowRes = await axios(
            "/api/recommendations?" +
              defaultParams +
              "&" +
              new URLSearchParams({
                min_key: match.lower[0],
                max_key: match.lower[1],
                min_mode: match.mode,
                max_mode: match.mode,
              })
          );
          combinedRecommendations.push(lowRes.data.tracks);
          const upRes = await axios(
            "/api/recommendations?" +
              defaultParams +
              "&" +
              new URLSearchParams({
                min_key: match.upper[0],
                max_key: match.upper[1],
                min_mode: match.mode,
                max_mode: match.mode,
              })
          );
          combinedRecommendations.push(upRes.data.tracks);
        }
        // Flatten recommendations
        const flattenedRecommendations = combinedRecommendations.flat();
        // Remove all duplicate recommendations
        const uniqueIds = [];
        const uniqueRecommendations = flattenedRecommendations.filter(
          (track) => {
            const exists = uniqueIds.includes(track.id);
            if (!exists) {
              uniqueIds.push(track.id);
              return true;
            } else {
              return false;
            }
          }
        );
        // Remove same tracks as seed
        const filteredRecommendations = uniqueRecommendations.filter(
          (track) => track.external_ids.isrc !== seed.external_ids.isrc
        );
        // Sort by popularity & last searched time
        const sortedRecommendations = filteredRecommendations.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        // Get all recommendation track IDs (batches of 50)
        const maxPerRequest = 50;
        const temp = [...sortedRecommendations];
        const recommendationIds = [];
        while (temp.length) {
          recommendationIds.push(
            temp
              .splice(0, maxPerRequest)
              .map((track) => track.id)
              .join(",")
          );
        }
        // Check if recommended tracks are saved (max 50 IDs per request)
        const savedBatches = [];
        for (let batch of recommendationIds) {
          const res = await axios(
            "/api/check-saved-tracks?" +
              new URLSearchParams({
                ids: batch,
              })
          );
          savedBatches.push(res.data);
        }
        // Flatten saved tracks
        const savedTracks = savedBatches.flat();
        // Add "saved" key/value pair
        sortedRecommendations.forEach(
          (track, index) => (track.saved = savedTracks[index])
        );
        // Set recommendations
        setRecommendations(sortedRecommendations);
      } catch (err) {
        setAccessToken("");
        navigate("/");
      }
    };
    getRecommendations();
  }, [seed, seedFeatures, refresh]);

  // Load more recommendations
  const handleLoadMoreClick = async () => {
    setLoad((prevState) => prevState + 10);
  };

  return (
    <Wrapper>
      {recommendations ? (
        <>
          <RecommendationsTitle>Recommendations</RecommendationsTitle>
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
            <LoadMore onClick={handleLoadMoreClick}>Look for more 👀</LoadMore>
          ) : (
            <LoadEnd>🏁 You've reached the end 🏁</LoadEnd>
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

const Wrapper = styled.div`
  width: 645px;
`;

const RecommendationsTitle = styled.h2`
  font-weight: bold;
  padding: 16px;
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
    background-color: var(--color-dark-light);
    color: var(--color-orange-accent);
  }
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

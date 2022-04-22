import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { SpotifyContext } from "../contexts/SpotifyContext";

import Track from "./Track";
import Loader from "./Loader";

import { toKeySubRanges } from "../utils/key";

const Recommendations = ({
  seed,
  seedFeatures,
  camelotMatches,
  bpmRange,
  keyRange,
  showCamelot,
  refresh,
}) => {
  const navigate = useNavigate();

  const { bpmRange, keyRange, MAX_BPM_RANGE } = useContext(SpotifyContext);

  const [recommendations, setRecommendations] = useState("");
  const [recommendationFeatures, setRecommendationFeatures] = useState("");
  const [load, setLoad] = useState(10);

  //Get recommendations tracks
  useEffect(() => {
    const getRecommendations = async () => {
      // Reset recommendations
      setRecommendations("");
      // Reset Load to 10
      setLoad(10);
      const defaultRecommendationsParams = new URLSearchParams({
        limit: 100,
        seed_tracks: seed.id,
        seed_artists: seed.artists.slice(0, 4).map((artist) => artist.id),
        min_tempo:
          bpmRange === MAX_BPM_RANGE
            ? 0
            : Number(seedFeatures.tempo.toFixed()) - bpmRange - 0.5,
        max_tempo:
          bpmRange === MAX_BPM_RANGE
            ? 300
            : Number(seedFeatures.tempo.toFixed()) + bpmRange + 0.49,
        // target_acousticness: seedFeatures.acousticness,
        // target_danceability: seedFeatures.danceability,
        // target_energy: seedFeatures.energy,
        // target_instrumentalness: seedFeatures.instrumentalness,
        // target_liveness: seedFeatures.liveness,
        // target_loudness: seedFeatures.loudness,
        // target_speechiness: seedFeatures.speechiness,
        // target_time_signature: seedFeatures.time_signature,
        // target_valence: seedFeatures.valence,
      });
      try {
        // Get combined recommendations
        const combinedRecommendations = [];
        // Separate API call for each key/mode sub ranges
        const keySubRanges = toKeySubRanges(
          seedFeatures.key,
          seedFeatures.mode,
          keyRange
        );
        for (let range of keySubRanges) {
          const recommendationsRes = await axios(
            "/api/recommendations?" +
              defaultRecommendationsParams +
              "&" +
              new URLSearchParams({
                min_key: range.minKey,
                max_key: range.maxKey,
                min_mode: range.minMode,
                max_mode: range.maxMode,
              })
          );
          combinedRecommendations.push(...recommendationsRes.data.tracks);
        }
        // Max 100 recommendations
        combinedRecommendations.splice(100);
        // Remove recommendation is same as seed
        const filteredRecommendations = combinedRecommendations.filter(
          (track) => track.external_ids.isrc !== seed.external_ids.isrc
        );
        // Sort by popularity
        const sortedRecommendations = filteredRecommendations.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        // Extract IDs
        const recommendationIds = sortedRecommendations.map(
          (track) => track.id
        );
        // Get recommendations audio features
        const featuresRes = await axios(
          "/api/audio-features?" +
            new URLSearchParams({
              ids: recommendationIds.join(","),
            })
        );
        console.log(sortedRecommendations);
        console.log(featuresRes.data.audio_features);
        setRecommendations(sortedRecommendations);
        setRecommendationFeatures(featuresRes.data.audio_features);
      } catch (err) {
        console.log(err.response.status, err.response.statusText);
      }
    };
    getRecommendations();
  }, [seedFeatures, refresh]);

  // Load more recommendations
  const handleLoadMoreClick = async () => {
    setLoad((prevState) => prevState + 10);
  };

  return (
    <Wrapper>
      {recommendations && recommendationFeatures ? (
        <>
          <RecommendationsTitle>Recommendations</RecommendationsTitle>
          {recommendations.slice(0, load).map((recommendation, index) => (
            <Track
              key={recommendation.id}
              track={recommendation}
              features={recommendationFeatures[index]}
              camelotMatches={camelotMatches}
              number={index + 1}
              showCamelot={showCamelot}
              isSeed={false}
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
  /* width: 645px; */
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

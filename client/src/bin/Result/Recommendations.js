// Libraries
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Components
import { SpotifyContext } from '../../contexts/SpotifyContext';
import Track from '../Track';
import Loading from '../../components/Loading';

// Misc.
import { toKeySubRanges } from '../../utils/key';
import { splitArray } from '../../utils/misc';

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
  const { userAuthHeaders, setUserAuthHeaders } = useContext(SpotifyContext);

  const [recommendations, setRecommendations] = useState('');
  const [recommendationFeatures, setRecommendationFeatures] = useState('');
  const [isSavedList, setIsSavedList] = useState('');
  const [load, setLoad] = useState(10);

  //Get recommendations tracks
  useEffect(() => {
    const getRecommendations = async () => {
      // Reset recommendations
      setRecommendations('');
      // Reset Load to 10
      setLoad(10);
      const defaultRecommendationsParams = new URLSearchParams({
        limit: 100,
        seed_tracks: seed.id,
        seed_artists: seed.artists.slice(0, 4).map((artist) => artist.id),
        min_tempo:
          bpmRange === 20
            ? 0
            : Number(seedFeatures.tempo.toFixed()) - bpmRange - 0.5,
        max_tempo:
          bpmRange === 20
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
            '/api/recommendations?' +
              defaultRecommendationsParams +
              '&' +
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
        // Remove recommendation if same as seed
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
        // If used connected
        if (userAuthHeaders) {
          // Split IDs to groups of 50
          const splitIds = splitArray(recommendationIds, 50);
          // Check if recommendation is in user's saved list
          const isSavedSplit = [];
          for (let batch of splitIds) {
            const savedRes = await axios(
              '/api/check-saved-tracks?' +
                new URLSearchParams({
                  ids: batch.join(','),
                }),
              userAuthHeaders
            );
            isSavedSplit.push(...savedRes.data);
          }
          setIsSavedList(isSavedSplit);
        } else {
          setIsSavedList('');
        }
        // Get recommendations audio features
        const featuresRes = await axios(
          '/api/audio-features?' +
            new URLSearchParams({
              ids: recommendationIds.join(','),
            })
        );
        setRecommendations(sortedRecommendations);
        setRecommendationFeatures(featuresRes.data.audio_features);
        // If user is connected
      } catch (err) {
        console.log('Get recommendations');
        console.log(err.response.status, err.response.statusText);
        setUserAuthHeaders('');
        navigate('/');
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
          {recommendations.slice(0, load).map((recommendation, index) => (
            <Track
              key={recommendation.id}
              track={recommendation}
              features={recommendationFeatures[index]}
              isSaved={isSavedList[index]}
              camelotMatches={camelotMatches}
              showCamelot={showCamelot}
              isSeed={false}
            />
          ))}
          {load < recommendations.length ? (
            <LoadMore
              onClick={handleLoadMoreClick}
              aria-label="Load 10 more recommendations"
            >
              Look for more 🔎
            </LoadMore>
          ) : (
            <LoadEnd>🏁 You've reached the end 🏁</LoadEnd>
          )}
        </>
      ) : (
        <Loading size="64" padding="64px" />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LoadMore = styled.button`
  width: 100%;
  height: 48px;
  padding: 16px;
  border-radius: 8px;

  display: flex;
  justify-content: center;

  font-weight: bold;
  background-color: var(--color-dark-contrast);

  &:hover,
  &:focus {
    background-color: var(--color-dark-light);
    color: var(--color-orange-accent);
  }
`;

const LoadEnd = styled.div`
  width: 100%;
  height: 48px;
  padding: 16px;
  border-radius: 8px;

  display: flex;
  justify-content: center;

  font-weight: bold;
  background-color: var(--color-dark-contrast);
`;

export default Recommendations;

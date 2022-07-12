// Packages
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

// React components
import FilterBar from './FilterBar';
import LoadingIcon from './LoadingIcon';
import TrackDetails from './TrackDetails';

// React contexts
import { SpotifyContext } from '../contexts/SpotifyContext';

// React hooks
import usePersistedState from '../hooks/use-persisted-state.hook';

// Utils
import { validateAuthHeaders } from '../utils/misc';
import { isCamelotMatch, convertToCamelotMatches } from '../utils/music';

// Api
import { getRecommendations, getTracksAudioFeatures } from '../api/client';
import { getContains } from '../api/user';

const Recommendations = ({ seed }) => {
  // Context states
  const { userAuthHeaders } = useContext(SpotifyContext);

  // Local states
  const [recs, setRecs] = useState(null);
  const [bpmRange, setBpmRange] = usePersistedState(5, 'bpm-range');
  const [keyRange, setKeyRange] = usePersistedState(2, 'key-range');
  const [showCount, setShowCount] = useState(10);
  // const [sortBy, setSortBy] = useState('popularity', 'sort-by');

  // Get recommendation tracks
  useEffect(() => {
    setRecs(null);
    (async () => {
      const recTracks = (await getRecommendations(seed, bpmRange, keyRange))
        .filter((track) => track.id !== seed.id)
        .slice(0, 100);
      if (recTracks.length === 0) return setRecs([]);
      const recIds = recTracks.map((track) => track.id);
      const recFeatures = await getTracksAudioFeatures(recIds);
      const camelotMatches = convertToCamelotMatches(seed.key, seed.mode);
      const recsAreCamelotMatches = recFeatures.map((rec) =>
        isCamelotMatch(rec.key, rec.mode, camelotMatches)
      );
      const recsAreSaved = validateAuthHeaders(userAuthHeaders)
        ? await getContains(recIds, userAuthHeaders)
        : recIds.map(() => false);
      setRecs(
        recIds.map((id, idx) => ({
          ...recTracks[idx],
          ...recFeatures[idx],
          isCamelotMatch: recsAreCamelotMatches[idx],
          isSaved: recsAreSaved[idx],
        }))
      );
    })();
  }, [seed, bpmRange, keyRange, userAuthHeaders]);

  const handleShowMoreClick = () => {
    setShowCount((prevState) => prevState + 10);
  };

  return (
    <Wrapper>
      <FilterBar
        bpmRange={bpmRange}
        setBpmRange={setBpmRange}
        keyRange={keyRange}
        setKeyRange={setKeyRange}
      />
      {!recs && <LoadingIcon size="48" padding="16px" />}
      {recs &&
        recs
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, showCount)
          .map((rec) => (
            <TrackDetails key={rec.id} track={rec} isSeed={false} />
          ))}
      {recs && (
        <ShowMoreBtn
          recs={recs}
          showCount={showCount}
          onClick={handleShowMoreClick}
        >
          {recs.length === 0 && 'No Results'}
          {showCount < recs.length && 'Show More'}
          {showCount >= recs.length && recs.length > 0 && 'End'}
        </ShowMoreBtn>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ShowMoreBtn = styled.button`
  width: 100%;
  height: 48px;
  padding: 16px;
  border-radius: 16px;
  pointer-events: ${({ recs, showCount }) =>
    showCount < recs.length ? 'inherit' : 'none'};

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

export default Recommendations;

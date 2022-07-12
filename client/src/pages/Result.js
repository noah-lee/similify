// Packages
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// React components
import SearchBar from '../components/SearchBar';
import LoadingIcon from '../components/LoadingIcon';
import TrackDetails from '../components/TrackDetails';
import Recommendations from '../components/Recommendations';
import ScrollUpBtn from '../components/ScrollUpBtn';

// React contexts
import { SpotifyContext } from '../contexts/SpotifyContext';

// Utils
import { getTrackAudioFeatures, getTrack } from '../api/client';
import { getContains } from '../api/user';
import { validateAuthHeaders } from '../utils/misc';

const Result = () => {
  // Router
  const { seedId } = useParams();

  // Context states
  const { userAuthHeaders } = useContext(SpotifyContext);

  // Local states
  const [seed, setSeed] = useState(null);

  // Get seed track
  useEffect(() => {
    setSeed(null);
    (async () => {
      const seedTrack = await getTrack(seedId);
      const seedFeatures = await getTrackAudioFeatures(seedId);
      const seedIsSaved = validateAuthHeaders(userAuthHeaders)
        ? await getContains(seedId, userAuthHeaders)
        : false;
      setSeed({
        ...seedTrack,
        ...seedFeatures,
        isSaved: seedIsSaved,
        isCamelotMatch: true,
      });
    })();
  }, [seedId, userAuthHeaders]);

  return (
    <Wrapper>
      <SearchBar />
      <Header>
        <Title>Title</Title>
        <Time>Time</Time>
        <Bpm>BPM</Bpm>
        <Key>Key</Key>
      </Header>
      {!seed && <LoadingIcon size="48" padding="16px" />}
      {seed && <TrackDetails track={seed} isSeed={true} />}
      {seed && <Recommendations seed={seed} />}
      <ScrollUpBtn />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 64px 32px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Header = styled.div`
  padding: 16px;

  display: flex;
  width: 100%;
  gap: 16px;

  font-weight: bold;
`;

const Title = styled.p`
  flex: 1;
  min-width: 224px;
`;

const Time = styled.p`
  width: 48px;
`;

const Bpm = styled.p`
  width: 48px;
`;

const Key = styled.p`
  width: 128px;
`;

export default Result;

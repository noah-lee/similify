// Libraries
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Components
import { SpotifyContext } from '../../contexts/SpotifyContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import Search from '../Search';
import Filter from '../Filter';
import Recommendations from './Recommendations';
import Track from '../Track';
import ScrollUp from './ScrollUp';

// Misc.
import usePersistedState from '../../hooks/use-persisted-state.hook';
import { toCamelotMatches } from '../../utils/key';

const Result = () => {
  const navigate = useNavigate();

  // Context states
  const { width, breakpointX } = useContext(ResponsiveContext);
  const { seed, userAuthHeaders } = useContext(SpotifyContext);

  // Local states
  const [seedFeatures, setSeedFeatures] = useState('');
  const [seedIsSaved, setSeedIsSaved] = useState('');
  const [refresh, setRefresh] = useState(true);
  const [camelotMatches, setCamelotMatches] = useState('');
  const [showCamelot, setShowCamelot] = useState(false);
  const [bpmRange, setBpmRange] = usePersistedState(10, 'bpm-range');
  const [keyRange, setKeyRange] = usePersistedState(2, 'key-range');

  if (!seed) navigate('/');

  // Get seed features (bpm, key)
  useEffect(() => {
    (async () => {
      const res = await axios(
        '/api/audio-features?' +
          new URLSearchParams({
            ids: seed.id,
          })
      );
      const features = res.data.audio_features[0];
      setCamelotMatches(toCamelotMatches(features.key, features.mode));
      setSeedFeatures(features);
    })();
  }, [seed]);

  // Check if seed is in user saved playlist
  useEffect(() => {
    if (!userAuthHeaders) return setSeedIsSaved(false);
    (async () => {
      const res = await axios(
        '/api/check-saved-tracks?' +
          new URLSearchParams({
            ids: seed.id,
          }),
        userAuthHeaders
      );
      setSeedIsSaved(res.data[0]);
    })();
  }, [seed, userAuthHeaders]);

  return (
    <Wrapper>
      <Search />
      {seedFeatures && (
        <ResultContainer width={width} breakpointX={breakpointX}>
          {/* <Filter
            seedFeatures={seedFeatures}
            isSaved={seedIsSaved}
            bpmRange={bpmRange}
            setBpmRange={setBpmRange}
            keyRange={keyRange}
            setKeyRange={setKeyRange}
            showCamelot={showCamelot}
            setShowCamelot={setShowCamelot}
            setRefresh={setRefresh}
          /> */}
          <ResultHeader>
            <HeaderTitle>Title</HeaderTitle>
            <HeaderTime>Time</HeaderTime>
            <HeaderBpm>BPM</HeaderBpm>
            <HeaderKey>Key</HeaderKey>
          </ResultHeader>
          <Track
            track={seed}
            features={seedFeatures}
            isSaved={seedIsSaved}
            camelotMatches={camelotMatches}
            showCamelot={showCamelot}
            isSeed={true}
          />
          <StyledH2>Similar Songs</StyledH2>
          {/* <Recommendations
            seed={seed}
            seedFeatures={seedFeatures}
            bpmRange={bpmRange}
            keyRange={keyRange}
            refresh={refresh}
            camelotMatches={camelotMatches}
            showCamelot={showCamelot}
          /> */}
        </ResultContainer>
      )}
      <ScrollUp />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

const ResultHeader = styled.div`
  padding: 16px;

  display: flex;
  width: 100%;
  gap: 16px;

  font-weight: bold;
`;

const HeaderTitle = styled.h2`
  flex: 1;
  min-width: 224px;
`;

const HeaderTime = styled.h2`
  width: 48px;
`;

const HeaderBpm = styled.h2`
  width: 48px;
`;

const HeaderKey = styled.h2`
  width: 128px;
`;

const StyledH2 = styled.h2`
  width: 100%;
  font-weight: bold;
  padding: 16px;
`;

const ResultContainer = styled.section`
  width: 100%;
  max-width: ${({ width, breakpointX }) =>
    width > breakpointX ? '1280px' : `${breakpointX}px`};
  min-width: '260px';

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export default Result;

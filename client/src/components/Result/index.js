// Libraries
import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import Logo from "../Logo";
import Search from "../Search";
import Filter from "./Filter";
import ResultHeader from "./ResultHeader";
import Recommendations from "./Recommendations";
import Track from "../Track";
import ScrollUp from "./ScrollUp";

// Misc.
import usePersistedState from "../../hooks/use-persisted-state.hook";
import { toCamelotMatches } from "../../utils/key";

const Result = () => {
  // const navigate = useNavigate();
  const { seed, width, breakpoint } = useContext(SpotifyContext);

  const [seedFeatures, setSeedFeatures] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [camelotMatches, setCamelotMatches] = useState("");
  const [showCamelot, setShowCamelot] = useState(false);
  const [bpmRange, setBpmRange] = usePersistedState(10, "bpm-range");
  const [keyRange, setKeyRange] = usePersistedState(2, "key-range");
  // Get seed track audio features
  useEffect(() => {
    (async () => {
      try {
        const res = await axios(
          "/api/audio-features?" +
            new URLSearchParams({
              ids: seed.id,
            })
        );
        const features = res.data.audio_features[0];
        setCamelotMatches(toCamelotMatches(features.key, features.mode));
        setSeedFeatures(features);
      } catch (err) {
        console.log(err.response.status, err.response.statusText);
      }
    })();
  }, [seed]);

  return (
    <Wrapper>
      <Logo />
      <Search />
      {seed && seedFeatures && (
        <ResultContainer width={width} breakpoint={breakpoint}>
          <Filter
            bpmRange={bpmRange}
            setBpmRange={setBpmRange}
            keyRange={keyRange}
            setKeyRange={setKeyRange}
            showCamelot={showCamelot}
            setShowCamelot={setShowCamelot}
            setRefresh={setRefresh}
          />
          {width > breakpoint ? <ResultHeader /> : <></>}
          <Track
            track={seed}
            features={seedFeatures}
            camelotMatches={camelotMatches}
            showCamelot={showCamelot}
            isSeed={true}
          />
          <Recommendations
            seed={seed}
            seedFeatures={seedFeatures}
            bpmRange={bpmRange}
            keyRange={keyRange}
            refresh={refresh}
            camelotMatches={camelotMatches}
            showCamelot={showCamelot}
          />
        </ResultContainer>
      )}
      <ScrollUp />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 32px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

const ResultContainer = styled.div`
  width: 100%;
  max-width: ${({ width, breakpoint }) =>
    width > breakpoint ? "1280px" : `${breakpoint}px`};
  min-width: "260px";

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export default Result;

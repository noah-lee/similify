// Libraries
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import Logo from "../Logo";
import Search from "../Search";
import Filter from "../Filter";
import ResultHeader from "./ResultHeader";
import RecommendationsHeader from "./RecommendationsHeader";
import Recommendations from "./Recommendations";
import Track from "../Track";
import ScrollUp from "./ScrollUp";

// Misc.
import usePersistedState from "../../hooks/use-persisted-state.hook";
import { toCamelotMatches } from "../../utils/key";

const Result = () => {
  const navigate = useNavigate();

  const { width, breakpointX } = useContext(ResponsiveContext);
  const { seed, userAuthHeaders, setUserAuthHeaders } =
    useContext(SpotifyContext);

  const [seedFeatures, setSeedFeatures] = useState("");
  const [seedIsSaved, setSeedIsSaved] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [camelotMatches, setCamelotMatches] = useState("");
  const [showCamelot, setShowCamelot] = useState(false);
  const [bpmRange, setBpmRange] = usePersistedState(10, "bpm-range");
  const [keyRange, setKeyRange] = usePersistedState(2, "key-range");

  // Get seed track audio features and check if saved
  useEffect(() => {
    (async () => {
      try {
        // If user connected
        if (userAuthHeaders) {
          // Check if seed track is saved
          const res = await axios(
            "/api/check-saved-tracks?" +
              new URLSearchParams({
                ids: seed.id,
              }),
            userAuthHeaders
          );
          setSeedIsSaved(res.data[0]);
        } else {
          setSeedIsSaved(false);
        }
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
        console.log("Get seed features and check saved");
        console.log(err.response.status, err.response.statusText);
        setUserAuthHeaders("");
        navigate("/");
      }
    })();
  }, [seed, userAuthHeaders]);

  return (
    <Wrapper>
      <Logo />
      <Search />
      {seed && seedFeatures && (
        <ResultContainer
          width={width}
          breakpointX={breakpointX}
          aria-label="Search result section"
        >
          <Filter
            seedFeatures={seedFeatures}
            isSaved={seedIsSaved}
            bpmRange={bpmRange}
            setBpmRange={setBpmRange}
            keyRange={keyRange}
            setKeyRange={setKeyRange}
            showCamelot={showCamelot}
            setShowCamelot={setShowCamelot}
            setRefresh={setRefresh}
          />
          <ResultHeader />
          <Track
            track={seed}
            features={seedFeatures}
            isSaved={seedIsSaved}
            camelotMatches={camelotMatches}
            showCamelot={showCamelot}
            isSeed={true}
          />
          <RecommendationsHeader
            seedFeatures={seedFeatures}
            bpmRange={bpmRange}
            keyRange={keyRange}
            refresh={refresh}
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
  /* max-width: 1280px; */
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

const ResultContainer = styled.section`
  width: 100%;
  max-width: ${({ width, breakpointX }) =>
    width > breakpointX ? "1280px" : `${breakpointX}px`};
  min-width: "260px";

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export default Result;

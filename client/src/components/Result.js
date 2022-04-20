import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FiChevronUp } from "react-icons/fi";

import { SpotifyContext } from "../contexts/SpotifyContext";

import Search from "./Search";
import BpmRange from "./BpmRange";
import KeyRange from "./KeyRange";
import Recommendations from "./Recommendations";
import SeedTrack from "./SeedTrack";

import { toCamelotMatches } from "../utils/key";

import usePersistedState from "../hooks/use-persisted-state.hook";

const Result = () => {
  const navigate = useNavigate();

  const { setAccessToken, seed } = useContext(SpotifyContext);

  // Seed track audio features, camelot matches
  const [seedFeatures, setSeedFeatures] = useState("");
  const [camelotMatches, setCamelotMatches] = useState("");

  // BPM range, key range, refresh toggle
  const [bpmRange, setBpmRange] = usePersistedState(10, "bpm-range");
  const [keyRange, setKeyRange] = usePersistedState(2, "key-range");
  const [refresh, setRefresh] = useState(true);

  // Show camelot keys
  const [showCamelot, setShowCamelot] = useState(false);

  // Show scroll up
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Get seed track audio features
  useEffect(() => {
    const getSeedFeatures = async () => {
      try {
        const res = await axios(`/api/audio-features/${seed.id}`);
        setCamelotMatches(toCamelotMatches(res.data.key, res.data.mode));
        setSeedFeatures(res.data);
      } catch (err) {
        setAccessToken("");
        navigate("/");
      }
    };
    getSeedFeatures();
  }, [seed]);

  // Handle refresh button click
  const handleRefreshClick = () => {
    setRefresh((prevState) => !prevState);
  };

  // Handle Key Click
  const handleKeyClick = () => {
    setShowCamelot((prevState) => !prevState);
  };

  // Only show scroll up once user scrolls 100px down
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    });
  }, []);

  // Scroll up
  const handleReturnTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <Search />
      {seedFeatures && (
        <FilterSection>
          <BpmRange bpmRange={bpmRange} setBpmRange={setBpmRange} />
          <KeyRange keyRange={keyRange} setKeyRange={setKeyRange} />
          <RefreshButton onClick={handleRefreshClick}>Refresh</RefreshButton>
        </FilterSection>
      )}
      <HeaderArea>
        <HeaderNumber>#</HeaderNumber>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderTime>Time</HeaderTime>
        <HeaderBpm>BPM</HeaderBpm>
        <HeaderKey onClick={handleKeyClick}>
          {showCamelot ? "Camelot" : "Key"}
        </HeaderKey>
      </HeaderArea>
      {seedFeatures && (
        <>
          <SeedTrack
            seed={seed}
            seedFeatures={seedFeatures}
            showCamelot={showCamelot}
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
        </>
      )}
      {showScrollUp ? (
        <ScrollUp onClick={handleReturnTopClick}>
          <FiChevronUp size="40px" />
        </ScrollUp>
      ) : (
        <Divider />
      )}
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
`;

const FilterSection = styled.div`
  width: 645px;
  display: flex;
  padding: 16px;
  margin-top: 64px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-dark-contrast);
`;

const RefreshButton = styled.button`
  height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  font-weight: bold;
  background-color: var(--color-dark-main);

  &:hover {
    color: var(--color-orange-accent);
    background-color: var(--color-dark-light);
  }
`;

const HeaderArea = styled.div`
  display: grid;
  grid-template-columns: 32px 320px 48px 48px 64px 20px;
  gap: 16px;
  font-weight: bold;
  padding: 16px;
`;
const HeaderNumber = styled.p``;
const HeaderTitle = styled.p``;
const HeaderTime = styled.p``;
const HeaderBpm = styled.p``;
const HeaderKey = styled.button`
  text-align: left;
`;

const ScrollUp = styled.button`
  color: white;
  position: sticky;
  align-self: flex-end;
  bottom: 64px;
  margin-right: 64px;
  height: 64px;

  &:hover {
    color: var(--color-orange-accent);
  }
`;

const Divider = styled.div`
  height: 64px;
`;

export default Result;

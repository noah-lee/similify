import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FiChevronUp } from "react-icons/fi";

import { SpotifyContext } from "../contexts/SpotifyContext";

import Logo from "./Logo";
import Search from "./Search";
import Filter from "./Filter";
import Recommendations from "./Recommendations";
import Track from "./Track";

import usePersistedState from "../hooks/use-persisted-state.hook";

import { toCamelotMatches } from "../utils/key";

const Result = () => {
  const navigate = useNavigate();
  const { seed } = useContext(SpotifyContext);

  // Seed track audio features
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
    };
    getSeedFeatures();
  }, [seed]);

  // Handle Show Key/Camelot Click
  const handleKeyCamelotClick = () => {
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
      <Logo />
      <Search />
      {seed && seedFeatures && (
        <ResultContainer>
          <Filter
            bpmRange={bpmRange}
            setBpmRange={setBpmRange}
            keyRange={keyRange}
            setKeyRange={setKeyRange}
            setRefresh={setRefresh}
          />
          <HeaderArea>
            <HeaderNumber>#</HeaderNumber>
            <HeaderTitle>Title</HeaderTitle>
            <HeaderTime>Time</HeaderTime>
            <HeaderBpm>BPM</HeaderBpm>
            <HeaderKey onClick={handleKeyCamelotClick}>
              {showCamelot ? "Camelot" : "Key"}
            </HeaderKey>
          </HeaderArea>
          <Track
            track={seed}
            features={seedFeatures}
            camelotMatches={camelotMatches}
            number="🌱"
            showCamelot={showCamelot}
            isSeed={true}
          />
          <Recommendations
            seed={seed}
            seedFeatures={seedFeatures}
            camelotMatches={camelotMatches}
            bpmRange={bpmRange}
            keyRange={keyRange}
            refresh={refresh}
            showCamelot={showCamelot}
          />
        </ResultContainer>
      )}
      {showScrollUp && (
        <ScrollUpIcon>
          <FiChevronUp onClick={handleReturnTopClick} size="40px" />
        </ScrollUpIcon>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
  gap: 64px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeaderArea = styled.div`
  display: grid;
  grid-template-columns: 32px 320px 48px 48px 64px; // 20px;
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
const ScrollUpIcon = styled.div`
  position: sticky;
  right: 64px;
  bottom: 0px;
  height: 40px;
  transform: translate(0, -64px);
  align-self: flex-end;
  &:hover {
    color: var(--color-orange-accent);
  }
`;

export default Result;

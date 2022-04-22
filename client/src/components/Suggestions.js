import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { SpotifyContext } from "../contexts/SpotifyContext";

import { msToMinSec } from "../utils/time";

const Suggestions = ({ suggestions, query, setQuery }) => {
  const navigate = useNavigate();
  const { setSeed } = useContext(SpotifyContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // On suggestion click
  const handleTrackSelect = (track) => {
    // axios.post("/api/popular-searches", {
    //   track,
    // });
    setSeed(track);
    setQuery("");
    navigate("/result");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (suggestions) {
        if (ev.key === "ArrowUp" && selectedIndex >= 1) {
          setSelectedIndex((prevState) => prevState - 1);
        }
        if (ev.key === "ArrowDown" && selectedIndex < suggestions.length - 1) {
          setSelectedIndex((prevState) => prevState + 1);
        }
        if (ev.key === "Enter") {
          handleTrackSelect(suggestions[selectedIndex]);
        }
        if (ev.key === "Escape") {
          setQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [suggestions, selectedIndex]);

  // On suggestion mouse enter
  const handleMousEnter = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Wrapper>
      {query && !suggestions.length ? (
        <NoResult>
          <p>Sorry, we couldn't find any results</p>
          <p>Try different keywords</p>
        </NoResult>
      ) : (
        suggestions.map((suggestion, index) => (
          <Suggestion
            onClick={() => handleTrackSelect(suggestion)}
            key={suggestion.id}
            style={{
              backgroundColor:
                selectedIndex === index ? "var(--color-orange-accent)" : "",
            }}
            onMouseEnter={() => handleMousEnter(index)}
          >
            <Art src={suggestion.album.images[2].url} height="48px" />
            <Title>
              <Name>{suggestion.name}</Name>
              <Artists>
                {suggestion.artists.map((artist) => artist.name).join(", ")}
              </Artists>
            </Title>
            <Time>{msToMinSec(suggestion.duration_ms)}</Time>
          </Suggestion>
        ))
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  background-color: var(--color-dark-contrast);
  border-radius: 16px;
  z-index: 10;
`;

const Suggestion = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const Art = styled.img``;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Name = styled.p`
  text-align: left;
`;

const Artists = styled.p`
  text-align: left;
  color: gray;
`;

const Time = styled.p`
  margin-left: auto;
`;

const NoResult = styled.div`
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default Suggestions;

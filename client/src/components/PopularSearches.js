import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { SpotifyContext } from "../contexts/SpotifyContext";

import Loader from "./Loader";

const PopularSearches = () => {
  const navigate = useNavigate();

  const { seed, setSeed, accessToken } = useContext(SpotifyContext);

  const [popularSearches, setPopularSearches] = useState("");

  // Get popular searches from database
  useEffect(() => {
    const getPopularSearches = async () => {
      try {
        const res = await axios("/api/popular-searches");
        setPopularSearches(res.data.tracks);
      } catch (err) {
        setPopularSearches("");
      }
    };
    getPopularSearches();
  }, [seed]);

  // Handle popular track click
  const handlePopularClick = (track) => {
    axios.post("/api/popular-searches", {
      track,
    });
    setSeed(track);
    navigate("/result");
  };

  return (
    <Wrapper>
      <Text>Popular Searches</Text>
      {popularSearches ? (
        <PopularSearchesContainer>
          {popularSearches.map((track) => (
            <Popular
              disabled={accessToken ? false : true}
              style={{ pointerEvents: accessToken ? "auto" : "none" }}
              key={track.id}
              onClick={() => handlePopularClick(track)}
            >
              <Art src={track.album.images[2].url} height="48px" />
              <Title>
                <Name>{track.name}</Name>
                <Artists>
                  {track.artists.map((artist) => artist.name).join(", ")}
                </Artists>
              </Title>
            </Popular>
          ))}
        </PopularSearchesContainer>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const PopularSearchesContainer = styled.div`
  display: grid;
  grid-template-columns: 240px 240px;
`;

const Text = styled.p`
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
  margin-bottom: 16px;
`;

const Popular = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  &:hover {
    background-color: var(--color-orange-accent);
  }
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

export default PopularSearches;

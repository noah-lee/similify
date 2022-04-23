import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { ReactComponent as SimilifyLoader } from "../assets/similify_loader.svg";

import { SpotifyContext } from "../contexts/SpotifyContext";

import useInterval from "../hooks/use-interval.hook";

import Loader from "./Loader";
import Suggestions from "./Suggestions";

const Search = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(SpotifyContext);

  const [query, setQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [delayToggle, setDelayToggle] = useState(true);

  // Handle search input change
  const handleQueryChange = async (ev) => {
    const value = ev.target.value;
    setSuggestions("");
    setQuery(value);
  };

  // Limit to 1 search api call per second
  useInterval(() => setDelayToggle((prevState) => !prevState), 1000);

  // Get Spotify search results
  useEffect(() => {
    if (query && prevQuery !== query) {
      setPrevQuery(query);
      const getSearch = async () => {
        try {
          const res = await axios(
            "/api/search?" +
              new URLSearchParams({
                q: query,
                type: "track",
                limit: 4,
              })
          );
          setSuggestions(res.data.tracks.items);
        } catch (err) {
          console.log(err.response.status, err.response.statusText);
        }
      };
      getSearch();
    } else if (!query && prevQuery !== query) {
      setPrevQuery("");
      setSuggestions("");
    }
  }, [delayToggle]);

  return (
    <Wrapper noValidate={true} onSubmit={(ev) => ev.preventDefault()}>
      <FiSearch color="gray" size="24px" />
      <StyledInput
        required={true}
        type="text"
        value={query}
        placeholder="Search"
        onChange={handleQueryChange}
      />
      {query && !suggestions ? <Loader size="24" /> : <Spacer />}
      {suggestions && (
        <Suggestions
          suggestions={suggestions}
          query={query}
          setQuery={setQuery}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.form`
  max-width: 520px;
  min-width: 260px;
  width: 100%;
  height: 48px;
  margin: 0 24px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 4px 16px;
  border-radius: 48px;
  background-color: white;

  &:hover {
    box-shadow: rgba(255, 175, 65, 0.4) 0px 5px,
      rgba(255, 175, 65, 0.3) 0px 10px, rgba(255, 175, 65, 0.2) 0px 15px,
      rgba(255, 175, 65, 0.1) 0px 20px, rgba(255, 175, 65, 0.05) 0px 25px;
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  height: 24px;
  width: 100px;
  color: var(--color-dark-contrast);
  font-size: 1.25rem;
  padding: 0 0 0 16px;
  flex-grow: 1;
`;

const Spacer = styled.div`
  width: 24px;
  height: 24px;
`;

export default Search;

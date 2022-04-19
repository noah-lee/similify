import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { ReactComponent as SimilifyLoader } from "../assets/similify_loader.svg";

import { SpotifyContext } from "../contexts/SpotifyContext";

import useInterval from "../hooks/use-interval.hook";

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
              }),
            {
              headers: {
                access_token: accessToken,
              },
            }
          );
          setSuggestions(res.data.tracks.items);
        } catch (err) {
          // window.alert(err.response.data.message);
          navigate("/");
          setAccessToken("");
          window.location.reload(false);
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
      <FiSearch color="gray" size="1.5rem" />
      <StyledInput
        disabled={accessToken ? false : true}
        required={true}
        type="text"
        value={query}
        placeholder={
          accessToken ? "Look for a song" : "Please log in"
        }
        onChange={handleQueryChange}
      />
      {query && !suggestions && (
        <Loader>
          <SimilifyLoader width="24" height="24" />
        </Loader>
      )}
      {suggestions && (
        <Suggestions suggestions={suggestions} query={query} setQuery={setQuery} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 560px;
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 4px 16px;
  border-radius: 48px;
  margin-bottom: 64px;
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
  color: var(--color-dark-contrast);
  font-size: 1.25rem;
  padding-left: 16px;
  flex: 1;
`;

const spin = keyframes`
  0% { transform: rotate(0deg)}
  100% { transform: rotate(360deg)}
`;

const Loader = styled.div`
  animation: ${spin} 3s linear infinite;
`;

export default Search;

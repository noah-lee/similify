// Libraries
import { useState /*, useContext*/ } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Components
// import { SpotifyContext } from "../../contexts/SpotifyContext"
import Loader from "../Loader";
import Suggestions from "./Suggestions";

// Misc.
import useInterval from "../../hooks/use-interval.hook";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  // const navigate = useNavigate();
  // const { accessToken, setAccessToken } = useContext(SpotifyContext);

  const [query, setQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");

  // Handle search input change
  const handleQueryChange = async (ev) => {
    const value = ev.target.value;
    setSuggestions("");
    setQuery(value);
  };

  // Get Spotify search results (Limit to 1 api call per second)
  useInterval(() => {
    if (query && prevQuery !== query) {
      setPrevQuery(query);
      (async () => {
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
      })();
    } else if (!query && prevQuery !== query) {
      setPrevQuery("");
      setSuggestions("");
    }
  }, 1000);

  return (
    <Wrapper
      noValidate={true}
      onSubmit={(ev) => ev.preventDefault()}
      query={query}
    >
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
  position: relative;

  width: 100%;
  max-width: 520px;
  min-width: 260px;
  height: 48px;
  border-radius: 48px;
  padding: 4px 16px;
  margin: 0 24px;

  display: flex;
  align-items: center;

  background-color: white;

  &:hover {
    box-shadow: rgba(255, 175, 65, 0.4) 0px 5px,
      rgba(255, 175, 65, 0.3) 0px 10px, rgba(255, 175, 65, 0.2) 0px 15px,
      rgba(255, 175, 65, 0.1) 0px 20px, rgba(255, 175, 65, 0.05) 0px 25px;
  }

  @media screen and (max-height: 768px) {
    ${({ query }) => {
      return query ? { position: "fixed", top: 0} : "";
    }}
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;

  min-width: 160px;
  height: 24px;
  padding: 0 0 0 16px;

  font-size: 1.25rem;
  color: var(--color-dark-contrast);
`;

const Spacer = styled.div`
  width: 24px;
  height: 24px;
`;

export default Search;

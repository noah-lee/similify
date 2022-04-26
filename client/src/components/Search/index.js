// Libraries
import { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

// Components
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import Loader from "../Loader";
import Suggestions from "./Suggestions";
import Close from "./Close";

// Misc.
import useInterval from "../../hooks/use-interval.hook";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const { height, breakpointY, setOverlay } = useContext(ResponsiveContext);

  const [query, setQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const searchRef = useRef(null);

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
                limit: 5,
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

  // Handle close
  const handleClose = () => {
    setQuery("");
    setPrevQuery("");
    setSuggestions("");
  };

  useEffect(() => {
    const handleOutsideClick = (ev) => {
      if (searchRef.current && !searchRef.current.contains(ev.target)) {
        handleClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Set search bar and suggestions as overlay if
  // query and window height below breakpointY
  useEffect(() => {
    if (query && height < breakpointY) {
      setOverlay(true);
    } else {
      setOverlay(false);
    }
  }, [query, height]);

  return (
    <Overlay query={query}>
      <Wrapper ref={searchRef}>
        <Form noValidate={true} onSubmit={(ev) => ev.preventDefault()}>
          <FiSearch color="gray" size="24px" />
          <StyledInput
            required={true}
            type="text"
            value={query}
            placeholder="Search"
            onChange={handleQueryChange}
          />
          {query ? (
            <>
              {suggestions ? (
                <Close size="24px" handleClose={handleClose} />
              ) : (
                <Loader size="24" />
              )}
            </>
          ) : (
            <Spacer />
          )}
        </Form>
        {suggestions && (
          <Suggestions
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            query={query}
            setQuery={setQuery}
          />
        )}
      </Wrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
  z-index: 5;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  width: 100%;

  display: flex;
  justify-content: center;

  @media screen and (max-height: 768px) {
    ${({ query }) => {
      return query
        ? {
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflowY: "scroll",
          }
        : "";
    }}
  }
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 520px;
  min-width: 280px;
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Form = styled.form`
  width: 100%;
  height: 48px;
  border-radius: 48px;
  padding: 4px 16px;

  display: flex;
  align-items: center;

  background-color: white;

  &:hover {
    box-shadow: rgba(255, 175, 65, 0.4) 0px 5px,
      rgba(255, 175, 65, 0.3) 0px 10px, rgba(255, 175, 65, 0.2) 0px 15px,
      rgba(255, 175, 65, 0.1) 0px 20px, rgba(255, 175, 65, 0.05) 0px 25px;
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

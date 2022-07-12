// Packages
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

// React Contexts
// import { ResponsiveContext } from '../contexts/ResponsiveContext';

// React Components
import LoadingIcon from './LoadingIcon';
import Suggestions from './Suggestions';

// React Hooks
import useInterval from '../hooks/use-interval.hook';
import useClickOut from '../hooks/use-click-out';

// Assets
import { FiSearch } from 'react-icons/fi';
import { search } from '../api/client';

const SearchBar = () => {
  // Context states
  // const { height, breakpointY, setOverlay } = useContext(ResponsiveContext);

  // Local states
  const [query, setQuery] = useState('');
  const [prevQuery, setPrevQuery] = useState('');
  const [suggestions, setSuggestions] = useState(null);

  // React ref
  const searchRef = useRef(null);

  // Handle search input change
  const handleQueryChange = (ev) => {
    const value = ev.target.value;
    setQuery(value);
  };

  // Get Spotify search results (Limit to 1 api call per second)
  useInterval(() => {
    if (prevQuery === query) return;
    if (!query) {
      setPrevQuery('');
      setSuggestions('');
      return;
    }
    setPrevQuery(query);
    (async () => {
      const results = await search(query);
      setSuggestions(results);
    })();
  }, 1000);

  // Handle close suggestions
  const handleClose = () => {
    setQuery('');
    setPrevQuery('');
    setSuggestions('');
  };

  // Close suggestions if clicked outside
  useClickOut(searchRef, handleClose);

  // Set search bar and suggestions as overlay if
  // query and window height below breakpointY
  // useEffect(() => {
  //   if (query && height < breakpointY) {
  //     setOverlay(true);
  //   } else {
  //     setOverlay(false);
  //   }
  // }, [query, height]);

  return (
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
        <Close
          query={query}
          suggestions={suggestions}
          handleClose={handleClose}
        />
      </Form>
      <Suggestions
        suggestions={suggestions}
        setQuery={setQuery}
        handleClose={handleClose}
      />
    </Wrapper>
  );
};

const Close = ({ query, suggestions, handleClose }) => {
  return (
    <div>
      {!query && <Spacer />}
      {query && suggestions && (
        <CloseBtn onClick={handleClose}>
          <FiX size="24px" color="gray" />
        </CloseBtn>
        // <CloseIcon size="24px" handleClose={handleClose} />
      )}
      {query && !suggestions && <LoadingIcon size="24" />}
    </div>
  );
};

// const Overlay = styled.div`
//   z-index: 5;
//   scrollbar-width: none; /* Firefox */
//   -ms-overflow-style: none; /* Internet Explorer 10+ */

//   &::-webkit-scrollbar {
//     /* WebKit */
//     width: 0;
//     height: 0;
//   }

//   width: 100%;

//   display: flex;
//   justify-content: center;

//   @media screen and (max-height: 768px) {
//     ${({ query }) => {
//       return query
//         ? {
//             position: 'fixed',
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             overflowY: 'scroll',
//           }
//         : '';
//     }}
//   }
// `;

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
  background-color: white;

  display: flex;
  align-items: center;

  &:hover {
    box-shadow: rgba(255, 175, 65, 0.4) 0px 5px,
      rgba(255, 175, 65, 0.3) 0px 10px, rgba(255, 175, 65, 0.2) 0px 15px,
      rgba(255, 175, 65, 0.1) 0px 20px, rgba(255, 175, 65, 0.05) 0px 25px;
  }
`;

const StyledInput = styled.input`
  min-width: 160px;
  height: 24px;
  padding: 0 0 0 16px;
  font-size: 1.25rem;
  color: var(--color-dark-contrast);

  flex-grow: 1;
  border: none;
  outline: none;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled.div`
  width: 24px;
  height: 24px;
`;

export default SearchBar;

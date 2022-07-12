// Packages
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// React Hooks
import useKeyboardNav from '../hooks/use-keyboard-nav.hook';

// Utils
import { msToMinSec } from '../utils/misc';

const Suggestions = ({ suggestions, setQuery, handleClose }) => {
  // Router
  const navigate = useNavigate();

  // Local states
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle suggestion select
  const handleTrackSelect = (track) => {
    handleClose();
    navigate(`/track/${track.id}`);
  };

  // Keyboard navigation
  useKeyboardNav(
    suggestions,
    selectedIndex,
    setSelectedIndex,
    handleTrackSelect,
    handleClose
  );

  // On suggestion mouse enter
  const handleMousEnter = (index) => {
    setSelectedIndex(index);
  };

  if (!suggestions) return;

  return (
    <Wrapper>
      {suggestions.length ? (
        suggestions.map((suggestion, index) => (
          <Track
            key={suggestion.id}
            onClick={() => handleTrackSelect(suggestion)}
            onMouseEnter={() => handleMousEnter(index)}
            selectedIndex={selectedIndex}
            index={index}
          >
            <AlbumArt src={suggestion.album.images[2].url} height="48px" />
            <Info>
              <Name>{suggestion.name}</Name>
              <Artists>
                {suggestion.artists.map((artist) => artist.name).join(', ')}
              </Artists>
            </Info>
            <Time>{msToMinSec(suggestion.duration_ms)}</Time>
          </Track>
        ))
      ) : (
        <TextContainer>
          <p>Sorry, we couldn't find any results</p>
          <p>Try different keywords</p>
        </TextContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  /* position: ${({ overlay }) => (overlay ? '' : 'absolute')}; */
  position: absolute;
  top: 80px;
  z-index: 10;
  width: 100%;
  border-radius: 16px;
  background-color: var(--color-dark-contrast);

  display: flex;
  flex-direction: column;
`;

const Track = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  border-radius: 16px;
  padding: 16px;
  background-color: ${({ selectedIndex, index }) =>
    selectedIndex === index ? 'var(--color-orange-accent)' : ''};

  display: flex;
  align-items: center;
  gap: 16px;
`;

const AlbumArt = styled.img``;

const Info = styled.div`
  text-align: left;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Name = styled.p``;

const Artists = styled.p`
  color: gray;
`;

const Time = styled.p`
  margin-left: auto;
`;

const TextContainer = styled.div`
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default Suggestions;

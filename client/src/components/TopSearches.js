// Packages
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// React Components
import LoadingIcon from './LoadingIcon';

// Styled Components
import { H2 } from '../styles/global.css';

// Api
import { getTopSearched } from '../api/db';

const TopSearches = () => {
  // Component states
  const [topSearches, setTopSearches] = useState('');

  // Get popular tracks from database
  useEffect(() => {
    (async () => {
      const top8 = await getTopSearched(8);
      setTopSearches(top8);
    })();
  }, []);

  return (
    <Wrapper>
      <StyledH2>Popular</StyledH2>
      {topSearches ? (
        <GridContainer>
          {topSearches.map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </GridContainer>
      ) : (
        <LoadingIcon size="64px" padding="64px" />
      )}
    </Wrapper>
  );
};

const Track = ({ track }) => {
  const navigate = useNavigate();

  const artistNames = track.artists.map((artist) => artist.name).join(', ');

  // Handle popular track click
  const handlePopularClick = (track) => {
    navigate(`/track/${track.id}`);
  };

  return (
    <TrackBtn onClick={() => handlePopularClick(track)}>
      <AlbumArt src={track.album.images[2].url} alt="album art" />
      <TrackInfo>
        <TrackName>{track.name}</TrackName>
        <ArtistNames>{artistNames}</ArtistNames>
      </TrackInfo>
    </TrackBtn>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const GridContainer = styled.div`
  margin: 32px;

  display: grid;
  grid-template-columns: 320px 320px;
  gap: 16px;
`;

const StyledH2 = styled(H2)`
  text-align: center;
`;

const TrackBtn = styled.button`
  text-decoration: none;
  color: inherit;

  width: 100%;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  gap: 16px;
  align-items: center;

  &:hover {
    background-color: var(--color-orange-accent);
  }
`;

const AlbumArt = styled.img`
  height: 48px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const TrackName = styled.p`
  text-align: left;
`;

const ArtistNames = styled.p`
  text-align: left;
  color: gray;
`;

export default TopSearches;

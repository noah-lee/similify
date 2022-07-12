// Packages
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import styled from 'styled-components';
import axios from 'axios';

// Assets
import spotifyIconWhite from '../assets/Spotify_Icon_RGB_White.png';

// React contexts
import { SpotifyContext } from '../contexts/SpotifyContext';

// Utils
import { convertToKey, convertToCamelot, convertToColor } from '../utils/music';
import { validateAuthHeaders, msToMinSec } from '../utils/misc';

// Api
import { addTrack, removeTrack } from '../api/user';

const TrackDetails = ({ track, isSeed }) => {
  const navigate = useNavigate();

  const { userAuthHeaders } = useContext(SpotifyContext);

  const [localIsSaved, setLocalIsSaved] = useState(track.isSaved);

  useEffect(() => {
    setLocalIsSaved(track.isSaved);
  }, [track]);

  const handleAlbumArtClick = (ev) => {
    ev.stopPropagation();
    window.open('https://open.spotify.com/track/' + track.id);
    if (!validateAuthHeaders(userAuthHeaders)) return;
    axios.put(
      '/api/me/player/play/',
      {
        context_uri: track.album.uri,
        offset: {
          position: track.track_number - 1,
        },
      },
      userAuthHeaders
    );
  };

  const handleTrackInfoClick = (track) => {
    navigate(`/track/${track.id}`);
  };

  const handleSaveClick = (ev) => {
    ev.stopPropagation();
    if (!validateAuthHeaders(userAuthHeaders)) return;
    if (localIsSaved) {
      removeTrack(track.id, userAuthHeaders);
    } else {
      addTrack(track.id, userAuthHeaders);
    }
    setLocalIsSaved(!localIsSaved);
  };

  return (
    <Wrapper>
      <AlbumArtBtn onClick={handleAlbumArtClick}>
        <AlbumArt src={track.album.images[2].url} alt="Album art" />
        <Hover>
          <SpotifyLogo src={spotifyIconWhite} />
        </Hover>
      </AlbumArtBtn>
      <InfoBtn
        style={{ pointerEvents: `${isSeed ? 'none' : 'inherit'}` }}
        onClick={() => handleTrackInfoClick(track)}
      >
        <Name>{track.name}</Name>
        <Artists>
          {track.artists.map((artist) => artist.name).join(', ')}
        </Artists>
      </InfoBtn>
      <Time>{msToMinSec(track.duration_ms)}</Time>
      <Bpm>{track.tempo.toFixed()}</Bpm>
      <Key track={track} isCamelotMatch={track.isCamelotMatch}>
        <p>{convertToKey(track.key, track.mode)}</p>
        <p>{convertToCamelot(track.key, track.mode)}</p>
      </Key>
      <SaveBtn user={userAuthHeaders} onClick={handleSaveClick}>
        <FiHeart
          style={{
            color: localIsSaved ? 'var(--color-orange-accent)' : 'gray',
            fill: localIsSaved ? 'var(--color-orange-accent)' : 'none',
          }}
          size="20px"
        />
      </SaveBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  align-items: center;
  gap: 16px;

  background-color: var(--color-dark-contrast);
`;

const AlbumArtBtn = styled.button`
  position: relative;
  width: 48px;
  height: 48px;

  /* &:focus {
    outline: auto var(--color-orange-accent);
  } */
`;

const AlbumArt = styled.img`
  height: 48px;
`;

const Hover = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #f3f3f3;
  opacity: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 1;
  }
`;

const SpotifyLogo = styled.img`
  width: 24px;
`;

const InfoBtn = styled.button`
  flex: 1;
  text-align: left;
  color: inherit;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  &:hover,
  &:focus {
    color: var(--color-orange-accent);
  }
`;

const Name = styled.p``;

const Artists = styled.p`
  font-weight: 400;
  color: gray;
`;

const Time = styled.p`
  width: 48px;
`;

const Bpm = styled.p`
  width: 48px;
`;

const Key = styled.div`
  width: 64px;
  color: ${({ track, isCamelotMatch }) =>
    isCamelotMatch ? convertToColor(track.key, track.mode) : 'inherit'};

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const SaveBtn = styled.button`
  margin: 0 14px;
  height: 20px;
  pointer-events: ${({ user }) => (user ? 'inherit' : 'none')};

  /* &:focus {
    outline: auto var(--color-orange-accent);
  } */
`;

export default TrackDetails;

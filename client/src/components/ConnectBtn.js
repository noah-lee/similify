// Packages
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// React Contexts
import { SpotifyContext } from '../contexts/SpotifyContext';

// React Hooks
import usePersistedState from '../hooks/use-persisted-state.hook';

// Assets
import spotifyIconGreen from '../assets/Spotify_Icon_RGB_Green.png';

// Utils
import { validateAuthHeaders, getHashParams } from '../utils/misc';

// Api
import { getRedirectUrl } from '../api/client';
import { getDisplayName } from '../api/user';

const ConnectBtn = () => {
  const navigate = useNavigate();

  // Context states
  const { userAuthHeaders, setUserAuthHeaders } = useContext(SpotifyContext);

  // Local states
  const [prevPath, setPrevPath] = usePersistedState('', 'saved-path');
  const [displayName, setDisplayName] = usePersistedState('', 'username');

  // Login or Logout
  const handleConnect = () => {
    validateAuthHeaders(userAuthHeaders) ? logout() : redirect();
  };

  // Re-direct to Spotify login page
  const redirect = () => {
    (async () => {
      setPrevPath(window.location.pathname);
      const url = await getRedirectUrl();
      window.location = url;
    })();
  };

  // Remove Spotify auth headers
  const logout = () => {
    setUserAuthHeaders('');
  };

  // Validate user auth headers
  useEffect(() => {
    if (!validateAuthHeaders(userAuthHeaders)) setUserAuthHeaders('');
  });

  // Get user Spotify display name
  useEffect(() => {
    if (!validateAuthHeaders(userAuthHeaders)) return setDisplayName('');
    (async () => {
      const name = await getDisplayName(userAuthHeaders);
      setDisplayName(name);
    })();
  }, [userAuthHeaders, setDisplayName]);

  // Set user Spotify auth headers
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in } = getHashParams(window.location.hash);
      const headers = {
        headers: {
          Authorization: 'Bearer ' + access_token,
          expiration: +expires_in * 1000,
          timestamp: Date.now(),
        },
      };
      setUserAuthHeaders(headers);
      navigate(prevPath);
    }
  });

  return (
    <Wrapper>
      {displayName && <p>Hello {displayName}</p>}
      <Button onClick={handleConnect}>
        <SpotifyIcon src={spotifyIconGreen} />
        <p>{validateAuthHeaders(userAuthHeaders) ? 'Disconnect' : 'Connect'}</p>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 16px;
  border-radius: 24px;

  background-color: white;
  color: var(--color-dark-main);
  font-weight: bold;

  &:hover,
  &:focus {
    color: #1ed760;
  }

  &:focus {
    outline: auto;
  }
`;

const SpotifyIcon = styled.img`
  width: 24px;
`;

export default ConnectBtn;

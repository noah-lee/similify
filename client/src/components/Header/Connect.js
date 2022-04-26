// Libraries
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";

// Misc.
import spotifyIconGreen from "../../assets/Spotify_Icon_RGB_Green.png";
import { getHashParams } from "../../utils/hash";
import usePersistedState from "../../hooks/use-persisted-state.hook";

const Connect = () => {
  const navigate = useNavigate();
  const { setUserAuthHeaders } = useContext(SpotifyContext);
  const [savedPath, setSavedPath] = usePersistedState("", "saved-path");

  // Redirect to Spotify authorization url
  const handleConnect = () => {
    (async () => {
      setSavedPath(window.location.pathname);
      try {
        const res = await axios("/api/log-in");
        window.location = res.data.url;
      } catch (err) {
        console.log(err.response.status, err.response.statusText);
      }
    })();
  };

  // Get Spotify user auth headers
  useEffect(() => {
    if (window.location.hash) {
      const hashParams = getHashParams(window.location.hash);
      const headers = {
        headers: { Authorization: "Bearer " + hashParams.access_token },
      };
      setUserAuthHeaders(headers);
      navigate(savedPath);
    }
  }, []);

  return (
    <StyledButton onClick={handleConnect}>
      <SpotifyIcon src={spotifyIconGreen} />
      <p>Connect</p>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 16px;
  border-radius: 24px;

  background-color: white;
  color: var(--color-dark-main);
  font-weight: bold;
`;

const SpotifyIcon = styled.img`
  width: 24px;
`;

export default Connect;

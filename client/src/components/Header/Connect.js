// Libraries
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";

// Misc.
import spotifyIconGreen from "../../assets/Spotify_Icon_RGB_Green.png";
import { getHashParams } from "../../utils/hash";

const Connect = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(SpotifyContext);

  // Redirect to Spotify authorization url
  const handleLogIn = () => {
    const logIn = async () => {
      try {
        const res = await axios("/api/log-in");
        window.location = res.data.url;
      } catch (err) {
        navigate("/");
      }
    };
    logIn();
  };

  // Get Spotify access token
  useEffect(() => {
    if (window.location.hash) {
      const hashParams = getHashParams(window.location.hash);
      setAccessToken(hashParams.access_token);
      navigate("/");
    }
  }, []);

  return (
    <StyledButton onClick={handleLogIn}>
      <SpotifyIcon src={spotifyIconGreen} />
      <p>Connect with Spotify</p>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  pointer-events: none;
  
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 12px 16px;
  border-radius: 24px;

  background-color: white;
  color: var(--color-dark-main);
  font-weight: bold;
`;

const SpotifyIcon = styled.img`
  width: 24px;
`;

export default Connect;

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { getHashParams } from "../utils/hash";

import { SpotifyContext } from "../contexts/SpotifyContext";
import spotifyLogoPath from "../assets/Spotify_Icon_RGB_Green.png";

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

    // NOTE: Run effect once on component mount, please
    // recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledButton onClick={handleLogIn}>
      <SpotifyLogo src={spotifyLogoPath} />
      <p>Connect with Spotify</p>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: white;
  padding: 8px 16px;
  border-radius: 24px;
  color: var(--color-dark-main);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SpotifyLogo = styled.img`
  width: 24px;
`;

export default Connect;

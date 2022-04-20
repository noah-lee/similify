import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { getHashParams } from "../utils/hash";

import { SpotifyContext } from "../contexts/SpotifyContext";

const LogIn = () => {
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

  return <StyledButton onClick={handleLogIn}>Log In</StyledButton>;
};

const StyledButton = styled.button`
  background-color: var(--color-dark-main);
  padding: 8px 16px;
  border-radius: 24px;

  &:hover {
    background-color: var(--color-dark-light);
    color: var(--color-orange-accent);
  }
`;

export default LogIn;

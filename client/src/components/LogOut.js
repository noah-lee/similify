import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SpotifyContext } from "../contexts/SpotifyContext";

const LogOut = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(SpotifyContext);

  // Reset Spotify access token
  const handleLogOut = () => {
    setAccessToken("");
    navigate("/");
    window.location.reload(false);
  };

  return <StyledButton onClick={handleLogOut}>Log Out</StyledButton>;
};

const StyledButton = styled.button`
  background-color: var(--color-dark-main);
  padding: 8px 16px;
  border-radius: 24px;

  &:hover {
    background-color: #282828;
    color: var(--color-orange-accent);
  }
`;

export default LogOut;

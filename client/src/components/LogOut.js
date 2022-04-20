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
  };

  return <StyledButton onClick={handleLogOut}>Log Out</StyledButton>;
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

export default LogOut;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SpotifyContext } from "../../contexts/SpotifyContext";

import spotifyLogoPath from "../../assets/Spotify_Icon_RGB_Green.png";

const Disconnect = () => {
  const navigate = useNavigate();
  const { setUserAuthHeaders } = useContext(SpotifyContext);

  // Reset Spotify access token
  const handleLogOut = () => {
    setUserAuthHeaders("");
  };

  return (
    <StyledButton onClick={handleLogOut} aria-label="Disconnect from website">
      <SpotifyLogo src={spotifyLogoPath} />
      <p>Disconnect</p>
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

  &:hover,
  &:focus {
    color: #1ed760;
  }

  &:focus {
    outline: auto;
  }
`;

const SpotifyLogo = styled.img`
  width: 24px;
`;

export default Disconnect;

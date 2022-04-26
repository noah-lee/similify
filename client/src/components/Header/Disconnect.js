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
    navigate("/");
  };

  return (
    <StyledButton onClick={handleLogOut}>
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
`;

const SpotifyLogo = styled.img`
  width: 24px;
`;

export default Disconnect;

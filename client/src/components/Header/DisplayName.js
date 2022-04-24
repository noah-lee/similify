import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { SpotifyContext } from "../../contexts/SpotifyContext";

const DisplayName = () => {
  const { accessToken, setAccessToken } = useContext(SpotifyContext);

  const [displayName, setDisplayName] = useState("");

  // Get Spotify display name
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios("/api/user-info");
        setDisplayName(res.data.display_name);
      } catch (err) {
        setAccessToken("");
      }
    };
    getUserInfo();
  }, [accessToken]);

  return (
    <>
      {displayName && (
        <StyledDisplayName>Hello {displayName}</StyledDisplayName>
      )}
    </>
  );
};

const StyledDisplayName = styled.p`
  font-weight: bold;
`;

export default DisplayName;

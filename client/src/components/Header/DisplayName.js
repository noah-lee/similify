import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { SpotifyContext } from "../../contexts/SpotifyContext";

const DisplayName = () => {
  const { userAuthHeaders } = useContext(SpotifyContext);

  const [displayName, setDisplayName] = useState("");

  // Get Spotify display name
  useEffect(() => {
    if (userAuthHeaders) {
      (async () => {
        try {
          const res = await axios("/api/user-info", userAuthHeaders);
          setDisplayName(res.data.display_name);
        } catch (err) {
          console.log(err.response.status, err.response.statusText);
        }
      })();
    }
  }, [userAuthHeaders]);

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

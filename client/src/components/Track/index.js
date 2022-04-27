// Libraries
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import DesktopTrack from "./DesktopTrack";
import MobileTrack from "./MobileTrack";

// Misc.
import { toColor } from "../../utils/key";

const Track = ({
  track,
  features,
  isSaved,
  camelotMatches,
  showCamelot,
  isSeed,
}) => {
  const navigate = useNavigate();

  const { setSeed, userAuthHeaders, setUserAuthHeaders } =
    useContext(SpotifyContext);
  const { width, breakpointX } = useContext(ResponsiveContext);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  // Update local isSaved
  useEffect(() => {
    setLocalIsSaved(isSaved);
  }, [isSaved, userAuthHeaders]);

  // Handle heart click
  const handleHeartClick = (ev) => {
    ev.stopPropagation();
    if (userAuthHeaders) {
      try {
        if (localIsSaved) {
          axios.delete(
            "/api/remove-track?" + new URLSearchParams({ ids: track.id }),
            userAuthHeaders
          );
        } else {
          axios.put(
            "/api/save-track?" + new URLSearchParams({ ids: track.id }),
            {},
            userAuthHeaders
          );
        }
        setLocalIsSaved((prevState) => !prevState);
      } catch (err) {
        console.log('Save/Remove track');
        console.log(err.response.status, err.response.statusText);
        setUserAuthHeaders("");
        navigate("/");
      }
    }
  };

  // Handle art click
  const handleArtClick = (ev) => {
    ev.stopPropagation();
    window.open("https://open.spotify.com/track/" + track.id)
    if (userAuthHeaders) {
      axios.put(
        "/api/play",
        {
          context_uri: track.album.uri,
          offset: {
            position: track.track_number - 1,
          },
        },
        userAuthHeaders
      );
    }
  };

  // Handle track click
  const handleTrackClick = () => {
    if (!isSeed) setSeed(track);
  };

  // Show color only if it is a camelot match
  const keyStyle = {
    color: `${
      showCamelot &&
      !camelotMatches
        .map((match) => JSON.stringify(match))
        .includes(JSON.stringify({ key: features.key, mode: features.mode }))
        ? "gray"
        : toColor(features.key, features.mode)
    }`,
  };

  // Heart styling
  const heartStyle = {
    color: localIsSaved ? "var(--color-orange-accent)" : "gray",
    fill: localIsSaved ? "var(--color-orange-accent)" : "none",
  };

  return (
    <>
      {width > breakpointX ? (
        <DesktopTrack
          track={track}
          features={features}
          showCamelot={showCamelot}
          isSeed={isSeed}
          handleTrackClick={handleTrackClick}
          handleArtClick={handleArtClick}
          keyStyle={keyStyle}
          heartStyle={heartStyle}
          handleHeartClick={handleHeartClick}
        />
      ) : (
        <MobileTrack
          track={track}
          features={features}
          showCamelot={showCamelot}
          isSeed={isSeed}
          handleTrackClick={handleTrackClick}
          handleArtClick={handleArtClick}
          keyStyle={keyStyle}
          heartStyle={heartStyle}
          handleHeartClick={handleHeartClick}
        />
      )}
    </>
  );
};

export default Track;

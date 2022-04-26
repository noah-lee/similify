// Libraries
import { useContext, useState } from "react";
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
  const { setSeed, userAuthHeaders } = useContext(SpotifyContext);
  const { width, breakpointX } = useContext(ResponsiveContext);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  if (isSeed) {
    console.log("inside track");
    console.log(isSaved);
  }

  // Handle heart click
  const handleHeartClick = (ev) => {
    ev.stopPropagation();
    if (userAuthHeaders) {
      if (localIsSaved) {
        axios.delete(
          "/api/remove-track?" + new URLSearchParams({ ids: track.id }),
          userAuthHeaders
        );
      } else {
        axios.put(
          "/api/save-track?" + new URLSearchParams({ ids: track.id }),
          userAuthHeaders
        );
      }
      setLocalIsSaved((prevState) => !prevState);
    }
  };

  // // Handle art click
  // const handleArtClick = (ev) => {
  //   ev.stopPropagation();
  //   axios.put("/api/play", {
  //     context_uri: seed.album.uri,
  //     offset: {
  //       position: seed.track_number - 1,
  //     },
  //   });
  // };

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
          keyStyle={keyStyle}
          heartStyle={heartStyle}
          handleHeartClick={handleHeartClick}
        />
      )}
    </>
  );
};

export default Track;

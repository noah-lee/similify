// Libraries
import { useContext } from "react";
import axios from "axios";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import DesktopTrack from "./DesktopTrack";
import MobileTrack from './MobileTrack';

// Misc.
import { toColor } from "../../utils/key";

const SeedTrack = ({
  track,
  features,
  camelotMatches,
  showCamelot,
  isSeed,
}) => {
  // const [saved, setSaved] = useState("");

  // // Check if seed track is saved
  // useEffect(() => {
  //   const checkSaved = async () => {
  //     const res = await axios(
  //       "/api/check-saved-tracks?" +
  //         new URLSearchParams({
  //           ids: seed.id,
  //         })
  //     );
  //     setSaved(res.data[0]);
  //   };
  //   checkSaved();
  // }, [seed]);

  // // Heart styling
  // const heartStyle = {
  //   color: saved ? "var(--color-orange-accent)" : "gray",
  //   fill: saved ? "var(--color-orange-accent)" : "none",
  // };

  // // Handle heart click
  // const handleHeartClick = () => {
  //   if (saved) {
  //     axios.delete(
  //       "/api/remove-track?" + new URLSearchParams({ ids: seed.id })
  //     );
  //   } else {
  //     axios.put("/api/save-track?" + new URLSearchParams({ ids: seed.id }));
  //   }
  //   setSaved((prevState) => !prevState);
  // };

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

  const { setSeed, width, breakpoint } = useContext(SpotifyContext);

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

  return (
    <>
      {width > breakpoint ? (
        <DesktopTrack
          track={track}
          features={features}
          showCamelot={showCamelot}
          isSeed={isSeed}
          handleTrackClick={handleTrackClick}
          keyStyle={keyStyle}
        />
      ) : (
        <MobileTrack
          track={track}
          features={features}
          showCamelot={showCamelot}
          isSeed={isSeed}
          handleTrackClick={handleTrackClick}
          keyStyle={keyStyle}
        />
      )}
    </>
  );
};

export default SeedTrack;

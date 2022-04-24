import { createContext, useState, useEffect } from "react";
import axios from "axios";

import usePersistedState from "../hooks/use-persisted-state.hook";

export const SpotifyContext = createContext();

export const SpotifyContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = usePersistedState("", "access_token");
  const [seed, setSeed] = usePersistedState("", "seed");

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [overlay, setOverlay] = useState(false);

  const breakpointX = 768;
  const breakpointY = 768;

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

  // Track window width & height
  useEffect(() => {
    const handleWindowChange = (ev) => {
      setWidth(ev.target.innerWidth);
      setHeight(ev.target.innerHeight);
    };

    window.addEventListener("resize", handleWindowChange);

    return () => window.removeEventListener("resize", handleWindowChange);
  }, []);

  // Don't allow body scroll when an overlay component is displayed
  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "auto";
  }, [overlay]);

  // if (accessToken) {
  //   axios.defaults.headers.common["access_token"] = accessToken;
  // }

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        setAccessToken,
        seed,
        setSeed,
        width,
        height,
        breakpointX,
        breakpointY,
        overlay,
        setOverlay,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

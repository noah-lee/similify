import { createContext, useState, useEffect } from "react";
import axios from "axios";

import usePersistedState from "../hooks/use-persisted-state.hook";

export const SpotifyContext = createContext();

export const SpotifyContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = usePersistedState("", "access_token");
  const [seed, setSeed] = usePersistedState("", "seed");
  const [width, setWidth] = useState(window.innerWidth);

  const breakpoint = 768;

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

  // Track window width
  useEffect(() => {
    const handleWidthChange = (ev) => {
      setWidth(ev.target.innerWidth);
    };

    window.addEventListener("resize", handleWidthChange);

    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

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
        breakpoint,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

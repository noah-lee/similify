import { createContext } from "react";
import axios from "axios";

import usePersistedState from "../hooks/use-persisted-state.hook";

export const SpotifyContext = createContext();

export const SpotifyContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = usePersistedState("", "access_token");
  const [seed, setSeed] = usePersistedState("", "seed");

  const MAX_BPM_RANGE = 20;

  axios.defaults.baseURL = "https://similify-server.herokuapp.com";
  // axios.defaults.baseURL = "http://localhost:8000";

  if (accessToken) {
    axios.defaults.headers.common["access_token"] = accessToken;
  }

  return (
    <SpotifyContext.Provider
      value={{ accessToken, setAccessToken, seed, setSeed, MAX_BPM_RANGE }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

import { createContext } from "react";

import usePersistedState from "../hooks/use-persisted-state.hook";

export const SpotifyContext = createContext();

export const SpotifyContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = usePersistedState("", "access_token");
  const [seed, setSeed] = usePersistedState("");

  const MAX_BPM_RANGE = 20;

  return (
    <SpotifyContext.Provider
      value={{ accessToken, setAccessToken, seed, setSeed, MAX_BPM_RANGE }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

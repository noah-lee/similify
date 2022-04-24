import { createContext } from "react";
import axios from "axios";

import usePersistedState from "../hooks/use-persisted-state.hook";

export const SpotifyContext = createContext();

export const SpotifyContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = usePersistedState("", "access_token");
  const [seed, setSeed] = usePersistedState("", "seed");

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

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
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

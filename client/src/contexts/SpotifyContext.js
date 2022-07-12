import { createContext } from 'react';
import axios from 'axios';

import usePersistedState from '../hooks/use-persisted-state.hook';

export const SpotifyContext = createContext();

export const SpotifyContextProvider = ({ children }) => {
  const [userAuthHeaders, setUserAuthHeaders] = usePersistedState(
    '',
    'user_auth_headers'
  );
  const [seed, setSeed] = usePersistedState('', 'seed');

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

  return (
    <SpotifyContext.Provider
      value={{
        userAuthHeaders,
        setUserAuthHeaders,
        seed,
        setSeed,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

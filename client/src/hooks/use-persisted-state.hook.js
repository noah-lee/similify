import { useEffect, useState } from 'react';

const usePersistedState = (initial, key) => {
  const persistedValue =
    localStorage.getItem(key) || localStorage.getItem(key) === 0
      ? () => JSON.parse(localStorage.getItem(key))
      : initial;
  const [value, setValue] = useState(persistedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default usePersistedState;

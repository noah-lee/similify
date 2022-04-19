import { useEffect, useState } from "react";

const usePersistedState = (initial, key) => {
  const [value, setValue] = useState(
    () => JSON.parse(sessionStorage.getItem(key)) || initial
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default usePersistedState;

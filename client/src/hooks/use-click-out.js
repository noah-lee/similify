import { useEffect } from 'react';

const useClickOut = (ref, callback) => {
  const handleClickOut = (ev) => {
    if (ref.current && !ref.current.contains(ev.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOut);

    return () => document.removeEventListener('click', handleClickOut);
  });
};

export default useClickOut;

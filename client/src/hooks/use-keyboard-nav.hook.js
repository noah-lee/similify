import { useEffect } from 'react';

const useKeyboardNav = (
  suggestions,
  index,
  setIndex,
  selectCallback,
  clearCallback
) => {
  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (suggestions) {
        if (ev.key === 'ArrowUp' && index >= 1) {
          setIndex((prevState) => prevState - 1);
        }
        if (ev.key === 'ArrowDown' && index < suggestions.length - 1) {
          setIndex((prevState) => prevState + 1);
        }
        if (ev.key === 'Enter') {
          selectCallback(suggestions[index]);
        }
        if (ev.key === 'Escape') {
          clearCallback();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });
};

export default useKeyboardNav;

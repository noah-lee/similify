const msToMinSec = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed();
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export { msToMinSec };

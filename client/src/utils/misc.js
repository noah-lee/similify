export const getHashParams = (hash) => {
  const hashArray = hash.substring(1).split('&');
  const params = hashArray.reduce((acc, item) => {
    const [key, value] = item.split('=');
    acc[key] = value;
    return acc;
  }, {});
  return params;
};

export const splitArray = (array, size) => {
  const temp = [...array];
  const result = [];
  while (temp.length) {
    result.push(temp.splice(0, size));
  }
  return result;
};

export const validateAuthHeaders = (headers) => {
  const result =
    !headers ||
    Date.now() - headers.headers.timestamp >= headers.headers.expiration
      ? false
      : true;
  return result;
};

export const msToMinSec = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed();
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

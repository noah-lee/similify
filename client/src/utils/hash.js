const getHashParams = (hash) => {
  const hashArray = hash.substring(1).split("&");
  const params = hashArray.reduce((acc, item) => {
    const [key, value] = item.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return params;
};

export { getHashParams };

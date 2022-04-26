const splitArray = (array, size) => {
  const temp = [...array];
  const result = [];
  while (temp.length) {
    result.push(temp.splice(0, size));
  }
  return result;
};

export { splitArray };

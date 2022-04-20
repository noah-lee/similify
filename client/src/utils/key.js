const keyDict = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
};

const colorDict = {
  0: "#36e7f4",
  1: "#3688f4",
  2: "#4336f4",
  3: "#a236f4",
  4: "#f436e7",
  5: "#f43688",
  6: "#f44336",
  7: "#f4a236",
  8: "#e7f436",
  9: "#88f436",
  10: "#36f443",
  11: "#36f4a2",
};

const toLetterKey = (key, mode) => {
  return `${keyDict[key]}${mode === 0 ? "min" : "maj"}`;
};

const toCamelotKey = (key, mode) => {
  const convertedKey = mode === 1 ? key : (key + 3) % 12;
  const letter = mode === 1 ? "B" : "A";
  return convertedKey % 2 === 0
    ? `${(convertedKey + 8) % 12}${letter}`
    : `${(convertedKey + 2) % 12}${letter}`;
};

const toColor = (key, mode) => {
  const convertedKey = mode === 1 ? key : (key + 3) % 12;
  return colorDict[
    convertedKey % 2 === 0 ? (convertedKey + 8) % 12 : (convertedKey + 2) % 12
  ];
};

const toCamelotMatches = (key, mode) => {
  const matches = [{ key: key, mode: mode }];
  matches.push({
    key: (key + 5) % 12,
    mode: mode,
  });
  matches.push({
    key: (key + 7) % 12,
    mode: mode,
  });
  if (mode === 1) {
    matches.push({ key: (key + 9) % 12, mode: 0 });
  } else {
    matches.push({ key: (key + 3) % 12, mode: 1 });
  }
  return matches;
};

const toKeyModeMatches = (key, mode, range) => {
  const majKey = mode === 1 ? key : (key + 3) % 12;
  const minKey = mode === 0 ? key : (key + 9) % 12;
  if (range <= 0) {
    return [
      {
        lower: [minKey, minKey],
        upper: [minKey, minKey],
        mode: 0,
      },
      {
        lower: [majKey, majKey],
        upper: [majKey, majKey],
        mode: 1,
      },
    ];
  }
  if (range >= 6) {
    return [
      {
        lower: [0, 5],
        upper: [6, 11],
        mode: 0,
      },
      {
        lower: [0, 5],
        upper: [6, 11],
        mode: 1,
      },
    ];
  }
  const result = [];
  const minNeg = (minKey + 12 - range) % 12;
  const minPos = (minKey + 12 + range) % 12;
  result[0] = {
    lower: minNeg < minPos ? [minNeg, minKey] : [minNeg, 11],
    upper: minNeg < minPos ? [minKey + 1, minPos] : [0, minPos],
    mode: 0,
  };
  const majNeg = (majKey + 12 - range) % 12;
  const majPos = (majKey + 12 + range) % 12;
  result[1] = {
    lower: majNeg < majPos ? [majNeg, majKey] : [majNeg, 11],
    upper: majNeg < majPos ? [majKey + 1, majPos] : [0, majPos],
    mode: 1,
  };
  return result;
};

export {
  toLetterKey,
  toCamelotKey,
  toColor,
  toCamelotMatches,
  toKeyModeMatches,
};

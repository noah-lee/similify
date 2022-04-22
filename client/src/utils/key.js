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

const toKeySubRanges = (key, mode, range) => {
  // Sub ranges if key range is ALL
  if (range >= 6) {
    return [
      {
        minKey: 0,
        maxKey: 11,
        minMode: 0,
        maxMode: 1,
      },
    ];
  }
  // Get key and relative major/minor keys
  const majKey = mode === 1 ? key : (key + 3) % 12;
  const minKey = mode === 0 ? key : (key + 9) % 12;
  // Sub ranges if key range is 0
  if (range <= 0) {
    return [
      {
        minKey: minKey,
        maxKey: minKey,
        minMode: 0,
        maxMode: 0,
      },
      {
        minKey: majKey,
        maxKey: majKey,
        minMode: 1,
        maxMode: 1,
      },
    ];
  }
  // Sub ranges if key range > 0 and < 6
  const result = [];
  // Minor key ranges
  const minNeg = (minKey + 12 - range) % 12;
  const minPos = (minKey + 12 + range) % 12;
  result.push({
    minKey: minNeg,
    maxKey: minNeg < minPos ? minKey : 11,
    minMode: 0,
    maxMode: 0,
  });
  result.push({
    minKey: minNeg < minPos ? minKey + 1 : 0,
    maxKey: minPos,
    minMode: 0,
    maxMode: 0,
  });
  // Major key ranges
  const majNeg = (majKey + 12 - range) % 12;
  const majPos = (majKey + 12 + range) % 12;
  result.push({
    minKey: majNeg,
    maxKey: majNeg < majPos ? majKey : 11,
    minMode: 1,
    maxMode: 1,
  });
  result.push({
    minKey: majNeg < majPos ? majKey + 1 : 0,
    maxKey: majPos,
    minMode: 1,
    maxMode: 1,
  });
  return result;
};

export { toLetterKey, toCamelotKey, toColor, toCamelotMatches, toKeySubRanges };

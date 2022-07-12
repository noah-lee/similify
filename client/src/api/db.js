// Packages
import axios from 'axios';

// Get top searched tracks from database
export const getTopSearched = async (count) => {
  const res = await axios(
    '/api/db/top/?' +
      new URLSearchParams({
        count,
      })
  );
  return res.data.tracks;
};

export const addTopSearch = async (track) => {};

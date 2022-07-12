// Packages
import axios from 'axios';

// Utils
import { splitArray } from '../utils/misc';

// Get user display name
export const getDisplayName = async (userAuthHeaders) => {
  const res = await axios('/api/me', userAuthHeaders);
  return res.data.display_name;
};

// Check if track is saved in user's 'Your Music' library
export const getContains = async (ids, userAuthHeaders) => {
  const idArray = typeof ids === 'string' ? [ids] : ids;
  const batchIds = splitArray(idArray, 50);
  const combined = [];
  for (let batch of batchIds) {
    const res = await axios(
      '/api/me/tracks/contains?' +
        new URLSearchParams({
          ids: batch.join(','),
        }),
      userAuthHeaders
    );
    combined.push(...res.data);
  }
  return combined.length === 1 ? combined[0] : combined;
};

// Remove track from user's 'Your Music' library
export const removeTrack = async (ids, userAuthHeaders) => {
  axios.delete(
    '/api/me/tracks?' + new URLSearchParams({ ids }),
    userAuthHeaders
  );
};

// Add track to user's 'Your Music' library
export const addTrack = async (ids, userAuthHeaders) => {
  axios.put(
    '/api/me/tracks?' + new URLSearchParams({ ids }),
    {},
    userAuthHeaders
  );
};

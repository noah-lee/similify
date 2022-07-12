// Packages
import axios from 'axios';

// Utils
import { convertToBpmRange, convertToKeyRanges } from '../utils/music';

// Get spotify authentication redirect url
export const getRedirectUrl = async () => {
  const res = await axios('/api/authorize');
  return res.data.url;
};

// Get search results
export const search = async (query) => {
  const res = await axios(
    '/api/search?' +
      new URLSearchParams({
        q: query,
        type: 'track',
        limit: 5,
      })
  );
  return res.data.tracks.items;
};

// Get track info
export const getTrack = async (id) => {
  const res = await axios(`/api/tracks/${id}`);
  return res.data;
};

// Get track metrics (single)
export const getTrackAudioFeatures = async (id) => {
  const res = await axios(`/api/audio-features/${id}`);
  return res.data;
};

// Get track metrics (multiple)
export const getTracksAudioFeatures = async (ids) => {
  const res = await axios(
    '/api/audio-features?' +
      new URLSearchParams({
        ids: ids.join(','),
      })
  );
  return res.data.audio_features;
};

// Get recommendations
export const getRecommendations = async (track, bpmRange, keyRange) => {
  const bpms = convertToBpmRange(track.tempo, bpmRange);
  const keys = convertToKeyRanges(track.key, track.mode, keyRange);
  const searchParams = new URLSearchParams({
    limit: 100,
    seed_tracks: track.id,
    seed_artists: track.artists.slice(0, 4).map((artist) => artist.id),
    min_tempo: bpms[0],
    max_tempo: bpms[1],
  });
  const combined = [];
  for (let sub of keys) {
    const keyParams = new URLSearchParams({
      min_key: sub.minKey,
      max_key: sub.maxKey,
      min_mode: sub.minMode,
      max_mode: sub.maxMode,
    });
    const res = await axios(
      `/api/recommendations?${searchParams}&${keyParams}`
    );
    combined.push(...res.data.tracks);
  }
  return combined;
};

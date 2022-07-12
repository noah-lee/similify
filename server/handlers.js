'use strich';

// PACKAGES 📦
const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// SECRET 🤫
const { CLIENT_SECRET } = process.env;

// SPOTIFY CLIENT CONFIG ⚙️
const CLIENT_ID = '8c2bf61fb7774277acea438120202d71';
const REDIRECT_URI = process.env.CLIENT_URL;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'user-modify-playback-state',
]
  .join(' ')
  .toString();

// MONGODB CONFIG ⚙️

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// AXIOS ERROR HANDLER 🚫

const handleAxiosError = (err) => {
  if (err.response) {
    console.log('ERROR RESPONSE');
    console.log('code: ', err.response.status);
    console.log('text: ', err.response.statusText);
    console.log('method: ', err.config.method);
    console.log('url: ', err.config.url);
    console.log('data: ', err.config.data);
    console.log(err.response.data);
  } else if (err.request) {
    console.log('NO RESPONSE');
    console.log(err.request);
  } else {
    console.log('SETUP ERROR');
    console.log('Request error:', err.message);
  }
};

// SPOTIFY CLIENT AUTHENTICATION 🔑

let CLIENT_AUTH_HEADERS;

const setClientAutHeaders = async () => {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
  });

  const headers = {
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
  };

  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      body,
      headers
    );
    CLIENT_AUTH_HEADERS = {
      Authorization: 'Bearer ' + res.data.access_token,
    };
  } catch (err) {
    handleAxiosError(err);
  }
};

setClientAutHeaders();

// CUSTOM SPOTIFY REQUEST (with access token retry) 📨⏰

const spotifyClientRequest = async (options, res) => {
  while (true) {
    try {
      const spotify = await axios(options);
      res.status(spotify.status).json(spotify.data);
      break;
    } catch (err) {
      // If access token is expired, get updated token and retry
      if (err.response.status === 401) {
        await setClientAutHeaders();
        options.headers = CLIENT_AUTH_HEADERS;
        // Else respond with error
      } else {
        res.status(err.response.status).json(err.response.data.error);
        break;
      }
    }
  }
};

// TEST ENDPOINT 📞

const test = async (req, res) => {
  // const options = {
  //   url: 'https://api.spotify.com/v1/browse/new-releases',
  //   headers: CLIENT_AUTH_HEADERS,
  // };
  // await spotifyClientRequest(options, res);
  res.cookie('test', 'text');
  res.json('ok');
};

// SPOTIFY ENDPOINTS 📞

// CLIENT REQUESTS

// Search track
const search = async (req, res) => {
  const options = {
    url: 'https://api.spotify.com/v1/search?' + new URLSearchParams(req.query),
    headers: CLIENT_AUTH_HEADERS,
  };
  await spotifyClientRequest(options, res);
};

// Get track
const getTrack = async (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/tracks/${req.params.id}`,
    headers: CLIENT_AUTH_HEADERS,
  };
  await spotifyClientRequest(options, res);
};

// Get track (single) audio features (bpm, key, mode, etc.)
const getTrackAudioFeatures = async (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/audio-features/${req.params.id}`,
    headers: CLIENT_AUTH_HEADERS,
  };
  await spotifyClientRequest(options, res);
};

// Get tracks (multiple) audio features (bpm, key, mode, etc.)
const getTracksAudioFeatures = async (req, res) => {
  const options = {
    url:
      'https://api.spotify.com/v1/audio-features?' +
      new URLSearchParams(req.query),
    headers: CLIENT_AUTH_HEADERS,
  };
  await spotifyClientRequest(options, res);
};

// Get recommendations
const getRecommendations = async (req, res) => {
  const options = {
    url:
      'https://api.spotify.com/v1/recommendations?' +
      new URLSearchParams(req.query),
    headers: CLIENT_AUTH_HEADERS,
  };
  await spotifyClientRequest(options, res);
};

// USER REQUESTS

// Get Spotify authorization url
const getRedirectUrl = async (req, res) => {
  const spotifyAuthUrl =
    'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'token',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      show_dialog: true,
    });
  res.status(200).json({ status: 200, url: spotifyAuthUrl, time: new Date() });
};

// Get user info
const getUserInfo = async (req, res) => {
  const userHeaders = {
    Authorization: req.headers.authorization,
  };
  try {
    const spotifyRes = await axios('https://api.spotify.com/v1/me', {
      headers: userHeaders,
    });
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Get saved tracks
const getContains = async (req, res) => {
  const userHeaders = {
    Authorization: req.headers.authorization,
  };
  try {
    const spotifyRes = await axios(
      'https://api.spotify.com/v1/me/tracks/contains?' +
        new URLSearchParams(req.query),
      {
        headers: userHeaders,
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Add track to user saved tracks
const addTrack = async (req, res) => {
  const userHeaders = {
    Authorization: req.headers.authorization,
  };
  try {
    const spotifyRes = await axios.put(
      'https://api.spotify.com/v1/me/tracks?' + new URLSearchParams(req.query),
      {},
      {
        headers: userHeaders,
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Remove track from user saved tracks
const removeTrack = async (req, res) => {
  const userHeaders = {
    Authorization: req.headers.authorization,
  };
  try {
    console.log('delete');
    const spotifyRes = await axios.delete(
      'https://api.spotify.com/v1/me/tracks?' + new URLSearchParams(req.query),
      {
        headers: userHeaders,
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Start playback
const startPlayback = async (req, res) => {
  const userHeaders = {
    Authorization: req.headers.authorization,
  };
  try {
    const spotifyRes = await axios.put(
      'https://api.spotify.com/v1/me/player/play',
      req.body,
      {
        headers: userHeaders,
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// MONGODB ENDPOINTS 📞

// Add song to MongoDB collection
const addTopSearch = async (req, res) => {
  // Request body
  const { track } = req.body;
  const query = { _id: track.external_ids.isrc };
  // Connect to MongoDB database
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db();
  // Add track to database
  try {
    // Check if track already exists in database
    const existingTrack = await db.collection('tracks').findOne(query);
    // If new, add track to database
    if (!existingTrack) {
      track._id = track.external_ids.isrc;
      track.count = 1;
      track.updated = Date.now();
      const addTrack = await db.collection('tracks').insertOne(track);
      // If existing, increment count key
    } else {
      const updateValues = {
        $inc: { count: 1 },
        $set: { updated: Date.now() },
      };
      const updateTrack = await db
        .collection('tracks')
        .updateOne(query, updateValues);
    }
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

// Get top searched tracks from MongoDB collection
const getTopSearched = async (req, res) => {
  // Connect to MongoDB database
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db();
  // Get popular searches from database
  // Sort by popularity & last searched and
  try {
    const sortedCollection = await db
      .collection('tracks')
      .find()
      .sort({ count: -1, updated: -1 })
      .limit(+req.query.count)
      .toArray();
    res.status(200).json({ status: 200, tracks: sortedCollection });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

// EXPORT HANDLERS ⬆️

module.exports = {
  test,
  search,
  getTrack,
  getTrackAudioFeatures,
  getTracksAudioFeatures,
  getRecommendations,
  getRedirectUrl,
  getUserInfo,
  getContains,
  addTrack,
  removeTrack,
  startPlayback,
  addTopSearch,
  getTopSearched,
};

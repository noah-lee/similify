"use strich";

const axios = require("axios");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });

// CONFIG
const { MONGO_URI, CLIENT_ID } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const REDIRECT_URI = "https://similify.netlify.app/";
// const REDIRECT_URI = "http://localhost:3000/";
const SCOPES =
  "user-read-private user-read-email user-library-read user-library-modify user-modify-playback-state";

// SPOTIFY ENDPOINTS

// Get Spotify login url
const logIn = async (req, res) => {
  const spotifyAuthUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "token",
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      show_dialog: true,
    });
  res.status(200).json({ status: 200, url: spotifyAuthUrl });
};

// Get user info
const getUserInfo = async (req, res) => {
  const { access_token } = req.headers;
  console.log("get user info");
  console.log(req.headers.access_token);
  try {
    const spotifyRes = await axios("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Search track
const search = async (req, res) => {
  const { access_token } = req.headers;
  const { q } = req.query;
  const spotifySearchUrl =
    "https://api.spotify.com/v1/search?" +
    new URLSearchParams({
      q: q,
      type: "track",
      limit: 5,
    });
  try {
    const spotifyRes = await axios(spotifySearchUrl, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Get track audio features (bpm, key, mode, etc.)
const getAudioFeatures = async (req, res) => {
  const { access_token } = req.headers;
  const { id } = req.params;
  try {
    const spotifyRes = await axios(
      `https://api.spotify.com/v1/audio-features/${id}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Get recommendations
const getRecommendations = async (req, res) => {
  const { access_token } = req.headers;
  const query = req.query;
  const spotifyRecommendationsUrl =
    `https://api.spotify.com/v1/recommendations?` + new URLSearchParams(query);
  try {
    const spotifyRes = await axios(spotifyRecommendationsUrl, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Get saved tracks
const checkSavedTracks = async (req, res) => {
  const { access_token } = req.headers;
  const query = req.query;
  try {
    const spotifyRes = await axios(
      "	https://api.spotify.com/v1/me/tracks/contains?" +
        new URLSearchParams(query),
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Add track to user saved tracks
const saveTrack = async (req, res) => {
  const { access_token } = req.headers;
  const query = req.query;
  try {
    const spotifyRes = await axios(
      "https://api.spotify.com/v1/me/tracks?" + new URLSearchParams(query),
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    console.log(err.response.data.error);
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Add track to user saved tracks
const removeTrack = async (req, res) => {
  const { access_token } = req.headers;
  const query = req.query;
  try {
    const spotifyRes = await axios.delete(
      "https://api.spotify.com/v1/me/tracks?" + new URLSearchParams(query),
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data.error);
  }
};

// Start Playback
const startPlayback = async (req, res) => {
  const { access_token } = req.headers;
  const query = req.body;
  try {
    const spotifyRes = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      query,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    res.status(spotifyRes.status).json(spotifyRes.data);
  } catch (err) {
    console.log(err.response.data.error);
    res.status(err.response.status).json(err.response.data.error);
  }
};

// MONGODB ENDPOINTS

const addPopularSearches = async (req, res) => {
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
    const existingTrack = await db.collection("tracks").findOne(query);
    // If new, add track to database
    if (!existingTrack) {
      track._id = track.external_ids.isrc;
      track.count = 1;
      track.updated = Date.now();
      const addTrack = await db.collection("tracks").insertOne(track);
      // If existing, increment count key
    } else {
      const updateValues = {
        $inc: { count: 1 },
        $set: { updated: Date.now() },
      };
      const updateTrack = await db
        .collection("tracks")
        .updateOne(query, updateValues);
    }
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const getPopularSearches = async (req, res) => {
  // Connect to MongoDB database
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db();
  // Get popular searches from database
  // Sort by popularity & last searched and
  // Limit to top 8
  try {
    const sortedCollection = await db
      .collection("tracks")
      .find()
      .sort({ count: -1, updated: -1 })
      .limit(8)
      .toArray();
    res.status(200).json({ status: 200, tracks: sortedCollection });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = {
  logIn,
  getUserInfo,
  search,
  getAudioFeatures,
  getRecommendations,
  checkSavedTracks,
  saveTrack,
  removeTrack,
  startPlayback,
  addPopularSearches,
  getPopularSearches,
};

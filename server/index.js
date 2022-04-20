const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

// Server
const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Handlers
const {
  logIn,
  getUserInfo,
  search,
  getAudioFeatures,
  getRecommendations,
  checkSavedTracks,
  saveTrack,
  removeTrack,
  addPopularSearches,
  getPopularSearches,
  startPlayback,
} = require("./handlers.js");

// SPOTIFY ENDPOINTS
app.get("/api/log-in", logIn);
app.get("/api/user-info", getUserInfo);
app.get("/api/search", search);
app.get("/api/audio-features/:id", getAudioFeatures);
app.get("/api/recommendations", getRecommendations);
app.get("/api/check-saved-tracks", checkSavedTracks);
app.put("/api/save-track", saveTrack);
app.delete("/api/remove-track", removeTrack);
app.put("/api/play/", startPlayback);

// MONGODB ENDPOINTS
app.post("/api/popular-searches", addPopularSearches);
app.get("/api/popular-searches", getPopularSearches);

app.listen(process.env.PORT || 8000, () => console.log(`🌎 Listening on 8000`));

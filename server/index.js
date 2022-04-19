const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const {
  logIn,
  getUserInfo,
  search,
  // getTrack,
  getAudioFeatures,
  // getArtist,
  // getTrackData,
  getRecommendations,
  getLiked,
  addPopularSearches,
  getPopularSearches,
} = require("./handlers.js");

const app = express();
const PORT = 8000;

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json())

app.get("/api/log-in", logIn);
app.get("/api/user-info", getUserInfo);
app.get("/api/search", search);
// app.get("/api/tracks/:id", getTrack);
app.get("/api/audio-features/:id", getAudioFeatures);
// app.get("/api/artists/:id", getArtist);
// app.get("/api/track-data", getTrackData);
app.get("/api/recommendations", getRecommendations);
app.get("/api/saved", getLiked);
app.post("/api/popular-searches", addPopularSearches);
app.get("/api/popular-searches", getPopularSearches)

app.listen(process.env.PORT || PORT, () => console.log(`Listenening on ${PORT}`));

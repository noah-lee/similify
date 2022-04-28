const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

// Server 🖥️
const app = express();

// MIDDLEWARE 🧑‍💼
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// IMPORT HANDLERS ⬇️
const {
  test,
  search,
  getAudioFeatures,
  getRecommendations,
  userConnect,
  getUserInfo,
  checkSavedTracks,
  saveTrack,
  removeTrack,
  startPlayback,
} = require("./handlers.js");

// TEST ENDPOINT 📞
app.get("/api/test", test);

// SPOTIFY ENDPOINTS 📞
app.get("/api/search", search);
app.get("/api/audio-features", getAudioFeatures);
app.get("/api/recommendations", getRecommendations);
app.get("/api/connect", userConnect);
app.get("/api/user-info", getUserInfo);
app.get("/api/check-saved-tracks", checkSavedTracks);
app.put("/api/save-track", saveTrack);
app.delete("/api/remove-track", removeTrack);
app.put("/api/play/", startPlayback);

// if (process.nextTick.NODE_ENV === "production") {
//   app.use(express.static('client/build'));
//   app.get("*", (req, res)=>{
//     req.sendFile(path.resolve(__dirname,"../client", "build", "index.html"))
//   })
// }

// LISTEN 👂
app.listen(process.env.PORT || 8000, () => console.log(`🌎 Listening on 8000`));

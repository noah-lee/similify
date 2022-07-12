const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Server 🖥️
const app = express();

// MIDDLEWARE 🧑‍💼
app.use(morgan('tiny'));
app.use(helmet());
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// IMPORT HANDLERS ⬇️
const {
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
} = require('./handlers.js');

// TEST ENDPOINT 📞
app.get('/api/test', test);

// SPOTIFY ENDPOINTS 📞
app.get('/api/search', search);
app.get('/api/tracks/:id', getTrack);
app.get('/api/audio-features/:id', getTrackAudioFeatures);
app.get('/api/audio-features', getTracksAudioFeatures);
app.get('/api/recommendations', getRecommendations);
app.get('/api/authorize', getRedirectUrl);

app.get('/api/me', getUserInfo);
app.get('/api/me/tracks/contains', getContains);
app.put('/api/me/tracks', addTrack);
app.delete('/api/me/tracks', removeTrack);
app.put('/api/me/player/play', startPlayback);

// MONGODB ENDPOINTS
app.post('/api/db/top', addTopSearch);
app.get('/api/db/top', getTopSearched);

// if (process.nextTick.NODE_ENV === "production") {
//   app.use(express.static('client/build'));
//   app.get("*", (req, res)=>{
//     req.sendFile(path.resolve(__dirname,"../client", "build", "index.html"))
//   })
// }

// LISTEN 👂
app.listen(process.env.PORT || 8000, () => console.log(`🌎 Listening on 8000`));

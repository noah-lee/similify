const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');

// Server 🖥️
const app = express();

// MIDDLEWARE 🧑‍💼
app.use(morgan('tiny'));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'img-src': ["'self'", 'https://i.scdn.co'],
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../', 'client', 'build')));

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

// LISTEN 👂
app.listen(process.env.PORT || 8000, () => console.log(`🌎 Listening on 8000`));

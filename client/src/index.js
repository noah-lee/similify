import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// import { ResponsiveContextProvider } from './contexts/ResponsiveContext';
import { SpotifyContextProvider } from './contexts/SpotifyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <SpotifyContextProvider>
    <App />
  </SpotifyContextProvider>
  //</React.StrictMode>
);

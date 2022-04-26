import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import { ResponsiveContextProvider } from "./contexts/ResponsiveContext";
import { SpotifyContextProvider } from "./contexts/SpotifyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <ResponsiveContextProvider>
    <SpotifyContextProvider>
      <App />
    </SpotifyContextProvider>
  </ResponsiveContextProvider>

  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { createContext, useState, useEffect } from "react";

export const ResponsiveContext = createContext();

export const ResponsiveContextProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [overlay, setOverlay] = useState(false);

  const breakpointX = 768;
  const breakpointY = 768;

  // Track window width & height
  useEffect(() => {
    const handleWindowChange = (ev) => {
      setWidth(ev.target.innerWidth);
      setHeight(ev.target.innerHeight);
    };

    window.addEventListener("resize", handleWindowChange);

    return () => window.removeEventListener("resize", handleWindowChange);
  }, []);

  // Don't allow body scroll when an overlay component is displayed
  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
  }, [overlay]);

  return (
    <ResponsiveContext.Provider
      value={{
        width,
        height,
        breakpointX,
        breakpointY,
        overlay,
        setOverlay,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

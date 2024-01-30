import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isSliderVisible, setIsSliderVisible] = useState(true);

  return (
    <GlobalStateContext.Provider value={{ isSliderVisible, setIsSliderVisible }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Add this if it's not already there
export const shouldUpdateScroll = () => {
  window.scrollTo(0, 0);
  return false;
};

// Add this if it's not already there
export const onPreRouteUpdate = () => {
  window.scrollTo(0, 0);
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

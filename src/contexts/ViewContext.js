import React, { createContext, useContext, useState } from "react";

const ViewContext = createContext();

const ViewProvider = ({ children }) => {
  const [horizontalScroll, setHorizontalScroll] = useState(true);

  const toggleView = () => {
    setHorizontalScroll((prev) => !prev);
  };

  return (
    <ViewContext.Provider value={{ horizontalScroll, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};

export { ViewProvider, useView };

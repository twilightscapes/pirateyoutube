import React, { createContext, useContext, useState, useEffect } from "react";

const ViewContext = createContext();

const ViewProvider = ({ children }) => {
  const [horizontalScroll, setHorizontalScroll] = useState(() => {
    // Retrieve the value from localStorage or use the default value
    const storedValue = localStorage.getItem("horizontalScroll");
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  const toggleView = () => {
    const newValue = !horizontalScroll;
    setHorizontalScroll(newValue);
  };

  // Save the value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("horizontalScroll", JSON.stringify(horizontalScroll));
  }, [horizontalScroll]);

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

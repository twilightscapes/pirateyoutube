import React, { createContext, useContext, useState, useEffect } from "react";

const ViewContext = createContext();

const ViewProvider = ({ children }) => {
  const [horizontalScroll, setHorizontalScroll] = useState(() => {
    // Retrieve the value from localStorage or use the default value
    const storedValue = localStorage.getItem("horizontalScroll");
    return storedValue !== null ? JSON.parse(storedValue) : false;
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
  try {
    const context = useContext(ViewContext);
    if (!context) {
      // Optionally, you can log a warning or provide a default value here
      console.warn("useView is being used outside a ViewProvider");
      return { horizontalScroll: true, toggleView: () => {} };
    }
    return context;
  } catch (error) {
    // Optionally, you can log the error or handle it in a way that fits your needs
    console.error("Error in useView:", error);
    return { horizontalScroll: true, toggleView: () => {} };
  }
};


export { ViewProvider, useView };

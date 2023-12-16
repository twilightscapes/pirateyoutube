import React, { useState, useEffect } from 'react';

const HorizontalScroll = () => {
  const [isHorizontalScroll, setHorizontalScroll] = useState(true);

  const toggleView = () => {
    setHorizontalScroll(!isHorizontalScroll);
  };

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      const container = document.querySelector(".view-container");
      container.scrollLeft += event.deltaY;
    };

    const container = document.querySelector(".view-container");

    if (container) {
      container.addEventListener("wheel", handleWheel);
    }

    return () => {
      // Remove the event listener when the component is unmounted
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []); // Empty dependency array ensures the effect runs once after mount

  return (
    <div>
      <button onClick={toggleView}>Toggle View</button>
      <div className={`view-container ${isHorizontalScroll ? 'horizontal-scroll' : 'grid-container'}`}>
        <div className="slider grid">
          <div className="post-card1" style={{ backgroundColor: '#ff0000', color: '#ddd' }}>post-card1 1</div>
          <div className="post-card1" style={{ backgroundColor: '#2b61a8', color: '#ddd' }}>post-card1 2</div>
          <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;

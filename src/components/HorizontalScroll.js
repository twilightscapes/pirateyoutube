// components/HorizontalScroll.js
import React, { useEffect } from "react";
import { useView } from "../contexts/ViewContext";

const HorizontalScroll = () => {
  const { horizontalScroll } = useView();

  useEffect(() => {
    const handleWheel = (event) => {
      // ... (same logic as in HomePage component)
    };

    const sliderContainer = document.querySelector(".horizontal-scroll1");

    if (sliderContainer) {
      sliderContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (sliderContainer) {
        sliderContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return [horizontalScroll]; // Return as an array
};

export default HorizontalScroll;

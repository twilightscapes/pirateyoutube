import React, { useState, useEffect } from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import styled from "styled-components";

const CustomBox = styled.div`
  .horizontal-scroll1 {
    display: flex;
    // overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 10px; /* Adjust as needed */
  }

  .slider {
    display: flex;
    scroll-snap-type: x mandatory;
    flex-shrink: 0;
    width: ${(props) => (props.isHorizontalScroll ? "300vw" : "100vw")}; /* Increase width for horizontal scroll */
    gap: 25px;
    justify-content: center;
    scroll-padding: 0 5%;
    overscroll-behavior: contain;
  }

  .grid-view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    padding: 0 5%;
    background-color: #2b61a8;
  }

  .post-card1 {
    min-height: ${(props) => (props.isHorizontalScroll ? "80vh" : "30vh")};
    max-height: 30vh;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: grid;
    place-content: center;
    background-color: ${(props) => (props.isHorizontalScroll ? "#ff0000" : "#2b61a8")};
    color: #ddd;
    width: ${(props) => (props.isHorizontalScroll ? "100vw" : "auto")};
    flex: ${(props) => (props.isHorizontalScroll ? "0 0 33.3333%" : "1")}; /* Adjust flex for grid view */
  }
`;


const HorizontalScroll = () => {
  const [isHorizontalScroll, setHorizontalScroll] = useState(true);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      const sliderContainer = document.querySelector(".horizontal-scroll1");
      if (sliderContainer) {
        sliderContainer.scrollLeft += event.deltaY;
      }
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

  const toggleView = () => {
    setHorizontalScroll(!isHorizontalScroll);
  };

  return (
    <CustomBox isHorizontalScroll={isHorizontalScroll}>
      <Layout>
        <Seo title="Test Page" />
        <button onClick={toggleView}>Toggle View</button>
        <div className={isHorizontalScroll ? "horizontal-scroll1" : "grid-view"}>
          <div className="slider">
            {[1, 2, 3].map((index) => (
              <div key={index} className="post-card1">
                post-card1 {index}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </CustomBox>
  );
};

export default HorizontalScroll;

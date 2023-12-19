import React, { useState, useEffect } from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import styled from "styled-components";

const CustomBox = styled.div`
  .post-container {
    padding: 0 3%;
    width: 100vw;
  }

  .horizontal-scroll1 {
    display: flex;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-align: center;
  }

  .slider {
    display: flex;
    scroll-snap-type: x mandatory;
    width: 300vw;
    gap: 25px;
    scroll-padding: 0 5%;
    overscroll-behavior: contain;
    scroll-snap-align: center;
  }

  // .grid-view {
  //   display: flex;
  //   gap: 25px;
  //   flex-wrap: wrap;
  //   justify-content: space-around;
  // }

  .post-card1 {
    min-height: ${(props) => (props.isHorizontalScroll ? "80vh" : "30vh")};
    max-height: 30vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: grid;
    place-content: center;
    color: #ddd;
    width: ${(props) => (props.isHorizontalScroll ? "100vw" : "300px")};
    flex: ${(props) => (props.isHorizontalScroll ? "0 0 33.3333%" : "1")};
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

        <div className="post-container">
          <div className={isHorizontalScroll ? "horizontal-scroll1" : "grid-container"} style={{ paddingRight: '' }} >
            {isHorizontalScroll && (
              <div className="slider">
                <div className="post-card1" style={{ backgroundColor: '#ff0000', color: '#ddd' }}>post-card1 1</div>
                <div className="post-card1" style={{ backgroundColor: '#2b61a8', color: '#ddd' }}>post-card1 2</div>
                <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
                <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
                <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
                <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
                <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
              </div>
            )}
            {!isHorizontalScroll && (
              <>
          <div className="post-card1" style={{ backgroundColor: '#ff0000', color: '#ddd' }}>post-card1 1</div>
          <div className="post-card1" style={{ backgroundColor: '#2b61a8', color: '#ddd' }}>post-card1 2</div>
          <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
          <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
          <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
          <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
          <div className="post-card1" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
          </>
            )}
            {/* Add more cards as needed */}
          </div>
        </div>
      </Layout>
    </CustomBox>
  );
};

export default HorizontalScroll;

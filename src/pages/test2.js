import React, {useEffect} from "react"
// import useSiteMetadata from "../hooks/SiteMetadata"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"


import styled from "styled-components"
const CustomBox = styled.div`

.horizontal-scroll1 {
  display: flex;
  -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on iOS */
// max-width: 80vw;  
margin: 0 auto;
  // max-height: 80vh;
}

.slider {
  display: flex;
  scroll-snap-type: x mandatory;
  flex-shrink: 0;
  width: 90vw; /* Set the width of each post-card1 to the viewport width */
  gap:25vw;
  justifyContent:center;
  scroll-padding:0 5%;
  overscroll-behavior:contain;

}


.post-card1 {
  flex: 0 0 100%;
  min-height: 80vh;
  // border: 1px solid #ddd;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: grid;
  place-content: center;
}
`

const HorizontalScroll = () => {

  
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      document.querySelector(".horizontal-scroll1").scrollLeft += event.deltaY;
    };

    const sliderContainer = document.querySelector(".horizontal-scroll1");

    if (sliderContainer) {
      sliderContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      
      // Remove the event listener when the component is unmounted
      if (sliderContainer) {
        sliderContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []); // Empty dependency array ensures the effect runs once after mount

  return (
  <CustomBox>
    <Layout>
      <Seo title="Test Page" />
    <div className="horizontal-scroll1">
      <div className="slider">
        <div className="post-card12" style={{ backgroundColor: '#ff0000', color: '#ddd' }}>post-card1 1</div>
        <div className="post-card12" style={{ backgroundColor: '#2b61a8', color: '#ddd' }}>post-card1 2</div>
        <div className="post-card12" style={{ backgroundColor: '#156e5e', color: '#ddd' }}>post-card1 3</div>
      </div>
    </div>
    </Layout>
    </CustomBox>
  );
};

export default HorizontalScroll;





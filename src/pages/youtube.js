// Test.js
import React from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import YouTubePlayer from "../components/youtube";
import { Helmet } from "react-helmet";

const Test = () => {
  return (
<>



    <Layout className="">

    <Helmet>
    <body id="body" className="youtube" />
  </Helmet>

  <Seo
    title="AdFree Video Player"
    description="Adfree Video Player"
  />









<div>
<YouTubePlayer />
</div>

{/* <div className="scroll-container1" style={{display:'flex', justifyContent:'start', maxWidth:'', height:'calc(100vh - 60px)', margin:'0 auto 0 auto', position:'relative', left:'0', right:'0', top:'0'}}>
<iframe title="Pirate Frame" id="youtube2" className="blog-video1" width="100%" height="400" src="http://www.youtube.com/embed/" frameBorder="0" playsInline  style={{position:'absolute', top:'0', left:'0', right:'0', zIndex:'0', width:'100%', height:'calc(100vh - 70px)', minHeight:'', border:'0px solid yellow', borderRadius:'0', padding:'0 0 0 0' }} />
</div> */}








    </Layout>
    </>
  );
};

export default Test;

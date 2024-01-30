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










    </Layout>
    </>
  );
};

export default Test;

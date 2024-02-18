import React from "react";
import PageMenu from "../components/PageMenu";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../hooks/SiteMetadata";
import VideoPlayer from "../components/VideoPlayer";

const VideoPage = ({ location }) => {
  const { proOptions } = useSiteMetadata();
  const { showBranding } = proOptions;

  // Assuming you're passing the video link as a query parameter named 'video'
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');
/* eslint-disable no-useless-escape */
const extractVideoId = (url) => {
  // Check if the URL is null or undefined
  if (!url) {
    return null;
  }

  // Regular expression to extract video ID from YouTube URL
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);

  // Check if a match is found and if it has the expected length
  if (match && match[7] && match[7].length === 11) {
    return match[7]; // Return the extracted video ID
  } else {
    return null; // Return null if the video ID cannot be extracted
  }
};



/* eslint-enable no-useless-escape */
  const videoId = extractVideoId(videoUrlParam);
  console.log('Video ID:', videoId);



  
  return (
    <Layout>
      <Helmet>
        <body id="body" className="youtube" />
      </Helmet>
      <Seo
        title="Pirate Video Player"
        description="Pirate Video Player"
        image={videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null}
      />
      <div className='player-wrapper'>
        {showBranding ? (
          <PageMenu />
        ) : (
          null
        )}
        <VideoPlayer location={location} />
      </div>
    </Layout>
  );
};

export default VideoPage;

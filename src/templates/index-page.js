import React from "react";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import VideoPlayer from "../components/VideoPlayer";

import { Helmet } from "react-helmet"
const VideoPage = ({ location }) => {
  return (
    <Layout>
      <Helmet>
        <body id="body" className="homepage" />
      </Helmet>
      <SeoWrapper location={location} />
      <div className='player-wrapper'>
        <VideoPlayer location={location} />
      </div>
    </Layout>
  );
};
        // Function to check if the app is running in standalone mode
      //   function isRunningStandalone() {
      //     if (typeof window !== 'undefined') {
      //         return window.matchMedia('(display-mode: standalone)').matches;
      //     }
      //     return false;
      // }


      const SeoWrapper = ({ location }) => {
        const queryParams = new URLSearchParams(location.search);
        const videoUrlParam = queryParams.get('video');
        const seoTitle = queryParams.get('seoTitle') || "☠ Pirate YouTube | Play Video ▶ ";
      
        const extractVideoId = (url) => {
          if (!url) {
            return null;
          }
          const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
          const match = url.match(regExp);
          const videoId = match ? match[1] : null;
          return videoId;
        };
      
        const videoId = extractVideoId(videoUrlParam);
      
        // Define the fallback image URL
        const fallbackImageUrl = 'https://pirateyoutube.com/assets/default-og-image.webp';
      
        // Construct the image URL based on the video ID
        const imageUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : fallbackImageUrl;
      
        return (
          <Seo
            title={seoTitle}
            description="Pirate YouTube - video on your terms"
            image={imageUrl}
          />
        );
      };
      
      

export default VideoPage;

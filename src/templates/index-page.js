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
        const seoTitleParam = queryParams.get('seoTitle') || "☠ Pirate YouTube | Play Video ▶ ";
        const seoTitle = seoTitleParam || "☠ Pirate YouTube | Play Video ▶ ";
      
        // Function to extract video ID from YouTube URL
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
      
        return (
          <Seo
            title={seoTitle}
            description="Pirate YouTube - video on your terms"
            image={videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null}
          />
        );
      };
      

export default VideoPage;

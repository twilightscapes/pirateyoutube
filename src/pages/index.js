import React from "react";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import VideoPlayer from "../components/VideoPlayer";
import { Helmet } from "react-helmet";
import PirateLogo from "../img/logo.svg";
const HomePage = ({ location }) => {
  return (
    <Layout>
      <Helmet>
        <body id="body" className="youtube" />
      </Helmet>
      <SeoWrapper location={location} />
      <div className='player-wrapper'>
        <VideoPlayer location={location} />
        <div
        className="menusnapp"
        style={{
          position: "absolute",
          zIndex: "0",
          top: "70px",
          gap: "0",
          padding: "2vh 2vw",
          alignItems: "center",
          // display: isMenuOpen ? "block" : "none",
          background: "var(--theme-ui-colors-headerBackground)",
          backgroundColor: "#222",
          width: "100dvw",
        }}
      >
        <div id="" className="flexbutt font" style={{ display: "", gap: "3vh", justifyContent: "center", alignItems: "center", margin: "0 0", padding: "0", position: "relative", minWidth: "80vw" }}>
          <div style={{ minWidth: "25vw", maxHeight: "15vh", textAlign: "center", color: "#fff" }}>
            <PirateLogo style={{ minWidth: "", maxHeight: "15vh", position: "", top: "", left: "" }} />
            the web revolution
          </div>
          <div className="flexcheek mob2 print" style={{ position: "", top: "", minWidth: "25vw", overflow: "", marginBottom: "", paddingTop: "", borderRadius: "var(--theme-ui-colors-borderRadius)" }}>
            <div className="nameblock font" style={{ margin: "0 auto 0 auto", padding: "0 0 0 0", alignContent: "center", display: "grid", textAlign: "center", justifyContent: "center", verticalAlign: "center", color: "#fff", paddingTop: "", fontSize: "clamp(1rem, 1.4vw, 3.2rem)", background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "10px double var(--theme-ui-colors-buttonHoverBg)", borderRadius: "var(--theme-ui-colors-borderRadius)", textShadow: "0 2px 0px #000", maxWidth: "" }}>
              <br />
              <span style={{ margin: "2vh auto", fontSize: "160%" }}>About PIRATE</span>
              <br />
              A web revolution is coming
              <br /><br />
              And it's completely FREE!
              <br />
              <a href="https://pirateweb.org/about" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid ' }}>About PIRATE</a>
            </div>
          </div>
          <div className="flexcheek mob2 print" style={{ position: "", top: "", minWidth: "25vw", overflow: "", marginBottom: "", paddingTop: "", borderRadius: "var(--theme-ui-colors-borderRadius)" }}>
            <div className="nameblock font" style={{ margin: "0 auto 0 auto", padding: "0 0 0 0", alignContent: "center", display: "grid", textAlign: "center", justifyContent: "center", verticalAlign: "center", color: "#fff", paddingTop: "", fontSize: "clamp(1rem, 1.4vw, 3.2rem)", background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "10px double var(--theme-ui-colors-buttonHoverBg)", borderRadius: "var(--theme-ui-colors-borderRadius)", textShadow: "0 2px 0px #000", maxWidth: "" }}>
              <br />
              <span style={{ margin: "2vh auto", fontSize: "160%" }}>Get PIRATE</span>
              <br />
              Web, Social &amp; Video Media
              <br /><br />
              Combined into your own app
              <br />
              <a href="https://pirateweb.org/install" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid ' }}>Become a PIRATE!</a>
            </div>
          </div>
        </div>
      </div>
      </div>

    </Layout>
  );
};

const SeoWrapper = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');
  const seoTitleParam = queryParams.get('seoTitle') || "☠ Pirate YouTube | Play Video ▶ ";
  const customImageParam = queryParams.get('customImage'); 

  // Function to extract video ID from YouTube URL
  const extractVideoId = (url) => {
    if (!url) {
      return null;
    }
    /* eslint-disable no-useless-escape */
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    const videoId = match ? match[1] : null;
    return videoId;
    /* eslint-disable no-useless-escape */
  };

  // Extract video ID
  const videoId = extractVideoId(videoUrlParam);

  return (
    <Seo
      title={seoTitleParam}
      description="Pirate: revolutionizing the web"
      image={customImageParam || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : 'https://pirateyoutube.com/assets/default-og-image.webp')}
    />
  );
};

export default HomePage;

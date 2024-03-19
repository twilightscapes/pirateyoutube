import React from "react";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import VideoPlayer from "../components/VideoPlayer";
import ReactPlayer from 'react-player/lazy';
import { Helmet } from "react-helmet";
import PirateLogo from "../img/logo.svg";

import { MdOutlineIosShare } from "react-icons/md";
import { StaticImage } from "gatsby-plugin-image"
const HomePage = ({ location }) => {

          // Function to check if the app is running in standalone mode
          function isRunningStandalone() {
            if (typeof window !== 'undefined') {
                return window.matchMedia('(display-mode: standalone)').matches;
            }
            return ;
        }

  return (
    <Layout>
      <Helmet>
        <body id="body" className="youtube" />
      </Helmet>
      <SeoWrapper location={location} />
      <div className='player-wrapper' style={{height:'100dvh'}}>
        <VideoPlayer location={location} />

        {!isRunningStandalone() ? (


        <div
        className="menusnapp"
        style={{
          position: "absolute",
          zIndex: "0",
          top: "6vh",
          gap: "0",
          padding: "2vh 2vw",
          alignItems: "center",
          // display: isMenuOpen ? "block" : "none",
          display: "",
          background: "var(--theme-ui-colors-headerBackground)",
          backgroundColor: "#222",
          width: "100dvw",
        }}
      >
        <div id="" className="flexbutt font" style={{ display: "", gap: "3vh", justifyContent: "center", alignItems: "center", margin: "0 0", padding: "0", position: "relative", minWidth: "80vw" }}>
          {/* <div style={{ minWidth: "25vw", maxHeight: "15vh", textAlign: "center", color: "#fff" }}>
            <PirateLogo style={{ minWidth: "", maxHeight: "15vh", position: "", top: "", left: "" }} />
            the web revolution
            <br /><br /><br />
              <span style={{ margin: "2vh auto", fontSize: "160%" }}>Install Now Free!</span>
              <br /><br /><br />
          </div> */}
          <div className="flexcheek mob2 print" style={{ position: "relative", top: "", minWidth: "25vw", overflow: "", marginBottom: "", paddingTop: "", borderRadius: "var(--theme-ui-colors-borderRadius)" }}>
            <div className="nameblock font" style={{ margin: "0 auto 0 auto", padding: "0 0 0 0", alignContent: "center", display: "grid", textAlign: "center", justifyContent: "center", verticalAlign: "center", color: "#fff", paddingTop: "", fontSize: "clamp(1rem, 1.4vw, 3.2rem)", background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "0px double var(--theme-ui-colors-buttonHoverBg)", borderRadius: "var(--theme-ui-colors-borderRadius)", textShadow: "0 2px 0px #000", maxWidth: "" }}>

              
              <span style={{ margin: "2vh auto 5px auto", fontSize: "160%" }}>Install Pirate Video Now!</span>
              
              {/* <span style={{ margin: "2vh auto", fontSize: "90%" }}>(Click <span style={{position:'relative', display:'block', left:'1%',}}><MdOutlineIosShare style={{fontSize:'30px'}} /></span> - then 'Save To Homepage')</span> */}


<div className="font" style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'1vw', textAlign:'center', justifyContent:'center',padding:'4px 0 0 40px', margin:'0 auto', border:'0px solid blue', width:'', maxWidth:'', fontSize: 'clamp(.8rem,1.2vw,1rem)', position:'relative'}}>

Click: 
<div style={{position:'relative', display:'block', left:'',}}><MdOutlineIosShare style={{fontSize:'24px'}} /></div>

  + <span style={{display:'block'}}>"Add To Home Screen"</span>



</div>

<br />







              <ReactPlayer url='/assets/Pirate-IOS-Install.mp4'
              config={{
    youtube: {
      playerVars: { showinfo: 0, autoplay: 1, mute: 1 }
    }
  }}
  playsinline
  playing
  loop
  style={{
    width:'100%',
    height:'100%',
  }}
    width="100%"
    height="100%"
              />

    

              <br />
              {/* <span style={{ margin: "2vh auto", fontSize: "160%" }}>About PIRATE</span>
              <br /> */}




              Watch Videos Ad-Free
              <br /><br />
              Create FREE shareable video links
              <br /><br />
              <span style={{fontSize:'88%'}}>with custom thumbnail, titles, and start/stop times</span>
              {/* <br />
              <a href="https://pirateweb.org/about" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid ' }}>About PIRATE</a> */}
              <br />
<StaticImage src="../../static/assets/screen-mirroring-badges.webp" alt="Works With Apple AirPlay" style={{height:'auto', width:'30%', position:'absolute', zIndex:'0', bottom:'20vh', left:'0', border:'0px solid !important', objectFit:'contain', margin:'0 auto'}} />

              <br />
            </div>
          </div>
          {/* <div className="flexcheek mob2 print" style={{ position: "", top: "", minWidth: "25vw", overflow: "", marginBottom: "", paddingTop: "", borderRadius: "var(--theme-ui-colors-borderRadius)" }}>
            <div className="nameblock font" style={{ margin: "0 auto 0 auto", padding: "0 0 0 0", alignContent: "center", display: "grid", textAlign: "center", justifyContent: "center", verticalAlign: "center", color: "#fff", paddingTop: "", fontSize: "clamp(1rem, 1.4vw, 3.2rem)", background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "10px double var(--theme-ui-colors-buttonHoverBg)", borderRadius: "var(--theme-ui-colors-borderRadius)", textShadow: "0 2px 0px #000", maxWidth: "" }}>
              <br />
              <span style={{ margin: "2vh auto", fontSize: "160%" }}>Get PIRATE</span>
              
              <br />
              Web, Social &amp; Video Media
              <br />
              Combined into your own app
            <br />
              <br />
              Get the full version free!
              <a href="https://pirateweb.org/install" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid ' }}>Become a PIRATE!</a>
              <br /><br />
            </div>
          </div> */}
        </div>
        {/* <br /><br /><br /> */}
      </div>

) : (

""

  )}



{isRunningStandalone() ? (
  <div
  className="menusnapp"
  style={{
    position: "absolute",
    zIndex: "0",
    top: "100px",
    gap: "0",
    padding: "2vh 2vw",
    alignItems: "center",
    // display: isMenuOpen ? "block" : "none",
    display: "",
    background: "var(--theme-ui-colors-headerBackground)",
    backgroundColor: "#222",
    width: "100dvw",
  }}
>
  <div id="" className="flexbutt font" style={{ display: "", gap: "3vh", justifyContent: "center", alignItems: "center", margin: "0 0", padding: "0", position: "relative", minWidth: "80vw" }}>
    <div style={{ minWidth: "25vw", maxHeight: "15vh", textAlign: "center", color: "#fff" }}>
      <PirateLogo style={{ minWidth: "", maxHeight: "15vh", position: "", top: "", left: "" }} />
      Your Personal Web App
      <br /><br /><br />
        <span style={{ margin: "2vh auto", fontSize: "130%" }}>Get The Full Version</span>
        <br /><br /><br />
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
        <a href="https://pirateweb.org/about" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid' }}>About PIRATE</a>
      </div>
    </div>
    <div className="flexcheek mob2 print" style={{ position: "", top: "", minWidth: "25vw", overflow: "", marginBottom: "", paddingTop: "", borderRadius: "var(--theme-ui-colors-borderRadius)" }}>
      <div className="nameblock font" style={{ margin: "0 auto 0 auto", padding: "0 0 0 0", alignContent: "center", display: "grid", textAlign: "center", justifyContent: "center", verticalAlign: "center", color: "#fff", paddingTop: "", fontSize: "clamp(1rem, 1.4vw, 3.2rem)", background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "10px double var(--theme-ui-colors-buttonHoverBg)", borderRadius: "var(--theme-ui-colors-borderRadius)", textShadow: "0 2px 0px #000", maxWidth: "" }}>
        <br />
        <span style={{ margin: "2vh auto", fontSize: "160%" }}>Get PIRATE</span>
        
        
        
        Get the full version!
        <br /><br />
        Web, Video &amp; Social Media
        <br />
        Combined into your own app
      
        <a href="https://pirateweb.org/install" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid ' }}>Become a PIRATE!</a>
        
      </div>
    </div>
  </div>
</div>
) : (
""
  )}


      </div>

    </Layout>
  );
};

const SeoWrapper = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');
  const seoTitleParam = queryParams.get('seoTitle') || "☠ Pirate Video | Play ▶ ";
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

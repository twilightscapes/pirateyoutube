import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare  } from "react-icons/fa";
import {Link} from "gatsby"
import { RiQuestionLine, RiCloseCircleFill } from "react-icons/ri"
import PirateLogo from "../img/logo.svg"
import PageMenu from "../components/PageMenu"
import Layout from "../components/siteLayout"
import Seo from "../components/seo";
import { Helmet } from "react-helmet";
const YouTubePlayer = () => {
  const [youtubelink, setYoutubelink] = useState("");


  useEffect(() => {
    const fillFormFromClipboard = () => {
      navigator.clipboard.readText().then((clipboardText) => {
        setYoutubelink(clipboardText);
        // handleShow();
      });
    };

    fillFormFromClipboard();
  }, []); // Empty dependency array to run the effect only once

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
  };

  // const handleShow = () => {
  //   setIsActive(true);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setYoutubelink("");
    // setIsActive(false);
  };

  const finalUrl = youtubelink


  



  return (
    
    <>

<Layout>
<Helmet>
    <body id="body" className="youtube" />
  </Helmet>
<Seo
    title="AdFree Video Player"
    description="Adfree Video Player"
  />

      <div className='player-wrapper'>
      <div
          className="pagemenu panel"
          style={{
            position: "fixed",
            top: "200px",
            zIndex: "1000",
            left: "1vw",
            right: "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            maxWidth: "98vw",
            margin: "0 auto",
            gap: "5vw",
            background: "rgba(0, 0, 0, .5)",
            padding: "",
            // border: "1px solid #666",
            borderRadius: "var(--theme-ui-colors-borderRadius)",
            textShadow: "0 1px 1px rgba(0, 0, 0, .7)",
            // fontSize: "clamp(2rem, 3vw, 3rem)",
            verticalAlign: "center",
          }}
        >
<PageMenu />
        </div>
          <ReactPlayer
            className='react-player1'
            url={finalUrl}
            width='100vw'
            height='93vh'
            config={{
              youtube: {
                playerVars: { showinfo: 1, autoplay: 1, controls: 1, mute: 0 }
              },
            }}
            playing
            color="white"
            controls
            style={{position:'relative', top:'0', zIndex:'0', height:'93vh', overflow:'hidden', background:'transparent'}}
          />
      </div>


      <div className="form-container controller" style={{marginTop:'0', height:'7vh', padding:'0 2%', width:'100vw', background:'var(--theme-ui-colors-headerColor)'}}>
          <div style={{ maxWidth:'800px', margin:'0 auto'}}>
          <form className="youtubeform frontdrop" onSubmit={handleSubmit}>
      
              <a title="Go Home" href="https://youtube.com" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <ImYoutube2 style={{ fontSize:'50px' }} />
              </a>
          
  
              <a title="Go Home" href="https://www.facebook.com/watch/" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaFacebookSquare style={{ fontSize: '30px' }} />
              </a>

              <a title="Go Home" href="https://www.twitch.tv/directory" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaTwitch style={{ fontSize: '30px' }} />
              </a>
            <input
              type="text"
              name="youtubelink"
              value={youtubelink}
              onInput={handleInputChange}
              // onChange={handleInputChange}
              style={{ padding: '1vh 1vw', width:'100%', minWidth: '220px', outline: '1px solid #333', borderRadius: 'var(--theme-ui-colors-borderRadius)', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="Paste Video Link"
              className="youtubelinker"
            />
            <button type="reset" onClick={handleReset} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>
          </div>
      </div>




      </Layout>
    </>
    
  );
};

export default YouTubePlayer;
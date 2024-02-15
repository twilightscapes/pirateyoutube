import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import PageMenu from "../components/PageMenu";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import { Helmet } from "react-helmet";

const Video = () => {
  const inputElement = useRef(null);
  const playerRef = useRef(null);
  const [youtubelink, setYoutubelink] = useState("");
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    const fillFormFromClipboard = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        setYoutubelink(clipboardText);
      } catch (error) {
        console.error("Error reading clipboard:", error);
      }
    };

    fillFormFromClipboard();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add any additional logic you need on form submission
  };

  function isRunningStandalone() {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false; // Return a default value if window is not defined
  }

  const handleShareButtonClick = () => {
    if (navigator.share) { 
      navigator.share({
        title: 'PIRATE',
        url: 'https://pirateyoutube.com'
      }).then(() => {
        console.log('Thanks for being a PIRATE!');
      })
      .catch(console.error);
    } else {
      setShowShareDialog(true);
    }
  };

  const closeShareDialog = () => {
    setShowShareDialog(false);
  };

  return (
    <>
      <Layout>
        <Helmet>
          <body id="body" className="youtube"/>
        </Helmet>
        <Seo
          title="Pirate Video Player"
          description="Pirate Video Player"
        />
    <div className='player-wrapper' style={{}}>
    <PageMenu />
    <div className="share-dialog" style={{ display: showShareDialog ? 'block' : 'none' }}>
                    <h3 className="dialog-title">Install PIRATE</h3>
                    <button className="close-button" onClick={closeShareDialog}>Close</button>
                    <div className="targets">
                      <a className="button">
                        <svg>
                          <use href="#facebook"></use>
                        </svg>
                        <span>Facebook</span>
                      </a>
                      <a className="button">
                        <svg>
                          <use href="#twitter"></use>
                        </svg>
                        <span>Twitter</span>
                      </a>
                      <a className="button">
                        <svg>
                          <use href="#linkedin"></use>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                      <a className="button">
                        <svg>
                          <use href="#email"></use>
                        </svg>
                        <span>Email</span>
                      </a>
                    </div>
                    <div className="link">
                      <div className="pen-url">https://pirateyoutube.com</div>
                      <button className="copy-link">Copy Link</button>
                    </div>
                  </div>
        <ReactPlayer
          ref={playerRef}
          allow="web-share"
          style={{
            position: 'relative', top: '0', margin: '0 auto 0 auto', zIndex: '1',  overflow: 'hidden', width: '100vw', minHeight: '', height: '100%', background: 'transparent'
          }}
          width="100%"
          height="100%"
          url={youtubelink}
          playing={true}
          controls={true}
          playsinline
          config={{
            youtube: {
              playerVars: { showinfo: false, autoplay: false, controls: true, start: "0", end: null, mute: false, loop: false }
            },
          }}
        />
        <div className="form-container controller font" style={{position:'relative', zIndex:'5', top:'0', marginTop:'0', height:'auto', padding:'2vh 2%', width:'100vw', background:'var(--theme-ui-colors-headerColor)'}}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form className="youtubeform frontdrop" onSubmit={handleSubmit}id="youtubeform" name="youtubeform">


              {isRunningStandalone() ? (
                <>
                  <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                    <ImYoutube2 style={{ fontSize: '50px' }} />
                  </a>
                  <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                    <FaFacebookSquare style={{ fontSize: '30px' }} />
                  </a>
                  <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                    <FaTwitch style={{ fontSize: '30px' }} />
                  </a>
                </>
              ) : (
                <>


                  
                  <button style={{ display: "flex", justifyContent: "center", padding: "0 .3vw", maxWidth: "", margin: "0 auto", textAlign:'center', fontSize:'14px', fontWeight:'light', textShadow:'0 1px 0 #000' }} className="button print" type="button" title="Add To Home Screen To Install PIRATE" onClick={handleShareButtonClick}>
                    
                    <div style={{ display: "flex", alignItems:'center', justifyContent: "center", padding: "4px .3vw", maxWidth: "", margin: "0 auto", textAlign:'center', fontSize:'14px', fontWeight:'light', textShadow:'0 1px 0 #000' }}>

                    <svg style={{maxWidth:'30px', maxHeight:'30px'}}>
                      <use href="#share-icon"></use>
                    </svg> Add To Home Screen To Install PIRATE</div>
                  </button>

                  
                  <svg className="hidden">
                    <defs>
                      <symbol id="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></symbol>
                    </defs>
                  </svg>
                </>
              )}




              <input
                ref={inputElement}
                id="youtubelink-input"
                type="text"
                name="youtubelink"
                value={youtubelink}
                onChange={handleInputChange}
                style={{ padding: '.5vh 1vw', width:'100%', minWidth: '', outline: '1px solid #333', borderRadius: 'var(--theme-ui-colors-borderRadius)', color: 'var(--theme-ui-colors-siteColor)', fontSize:'clamp(.8rem,1.5vw,2rem)' }}
                placeholder="Paste Video Link"
                className="youtubelinker"
              />
              <button type="reset" onClick={() => setYoutubelink("")} style={{ color: '', fontSize:'clamp(.8rem,1.5vw,2rem)', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};

export default Video;

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
// import { Link } from "gatsby";
import useSiteMetadata from "../hooks/SiteMetadata"

const VideoPlayer = () => {

  const { proOptions, featureOptions } = useSiteMetadata();
  const { showBranding } = proOptions
  const { showNav } = featureOptions


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
  
    // Scroll to the #piratevideo element
    const pirateVideoElement = document.getElementById('VideoPlayer');
    if (pirateVideoElement) {
      pirateVideoElement.scrollIntoView({ behavior: 'smooth' });
    }
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
        url: 'https://piratevideo.org'
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
    <div id="piratevideo" className='player-wrapper' style={{ display:'grid', placeContent:'', width:'100vw', transition: 'all 1s ease-in-out'}}>


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
                      <div className="pen-url">https://piratevideo.org</div>
                      <button className="copy-link">Copy Link</button>
                    </div>
    </div>


    <div className="form-container controller font" style={{position:'relative', zIndex:'4', top:'0', height:'auto', width:'100vw', margin:'0 auto',marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background:'var(--theme-ui-colors-headerColor)'}}>
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


                  
{showBranding ? (
                  <>
                  <button style={{ display: "flex", justifyContent: "center", padding: "0 .3vw", maxWidth: "", margin: "0 auto", textAlign:'center', fontSize:'14px', fontWeight:'light', textShadow:'0 1px 0 #000', pointer:'none' }} className=" print" type="button" title="Add To Home Screen To Install PIRATE" 
                  // onClick={handleShareButtonClick}
                  >
                    
                    <div style={{ display: "flex", alignItems:'center', justifyContent: "center", padding: "4px .3vw", maxWidth: "", margin: "0 auto", textAlign:'center', fontSize:'14px', fontWeight:'light', textShadow:'0 1px 0 #000' }}>

                    <svg style={{maxWidth:'30px', maxHeight:'30px'}}>
                      <use href="#share-icon"></use>
                    </svg> Add To Home Screen To Install PIRATE Lite</div>
                  </button>

                  
                  <svg className="hidden">
                    <defs>
                      <symbol id="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></symbol>
                    </defs>
                  </svg>
                  </>
                  ) : (
            ""
          )}
                </>
              )}




              <input
                ref={inputElement}
                id="youtubelink-input"
                type="text"
                name="youtubelink"
                value={youtubelink}
                onChange={handleInputChange}
                style={{ padding: '.5vh 1vw', width:'100%', maxWidth: '800px', fontSize:'clamp(.8rem,1.5vw,2rem)',transition: 'all 1s ease-in-out' }}
                placeholder="Paste Video Link"
                className="youtubelinker"
              />
              <button type="reset" onClick={() => setYoutubelink("")} style={{ color: '', fontSize:'clamp(.8rem,1.5vw,2rem)', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
                Reset
              </button>
            </form>
          </div>
        </div>



        <ReactPlayer
          ref={playerRef}
          allow="web-share"
          style={{
            position: 'relative', top: '0', margin: '0 auto 0 auto', zIndex: '1',  overflow: 'hidden', width: '100vw', minHeight: '', height: '100%', background: 'transparent',
            transition: 'all 1s ease-in-out',
            
            
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

      </div>
    </>
  );
};

export default VideoPlayer;

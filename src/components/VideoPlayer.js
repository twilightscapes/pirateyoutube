import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import useSiteMetadata from "../hooks/SiteMetadata"

const VideoPlayer = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');

  const { proOptions, featureOptions } = useSiteMetadata();
  const { showBranding } = proOptions
  const { showNav } = featureOptions

  const inputElement = useRef(null);
  const playerRef = useRef(null);
  const [youtubelink, setYoutubelink] = useState(videoUrlParam || "");
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    const fillFormFromClipboard = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        setYoutubelink(clipboardText);
        updateQueryString(clipboardText);
      } catch (error) {
        console.error("Error reading clipboard:", error);
      }
    };

    fillFormFromClipboard();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
    updateQueryString(value);

    const pirateVideoElement = document.getElementById('VideoPlayer');
    if (pirateVideoElement) {
      pirateVideoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setYoutubelink(""); // Clear the input field value
    updateQueryString(""); // Clear the query string
  };

  const updateQueryString = (value) => {
    const newUrl = `${window.location.pathname}?video=${encodeURIComponent(value)}`;
    window.history.pushState({}, '', newUrl);
  };

  function isRunningStandalone() {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
  }

  const handleShareButtonClick = () => {
    if (navigator.share) { 
      navigator.share({
        title: 'PIRATE',
        url: window.location.href // Use the current URL with the query string
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href); // Copy the current URL with the query string to clipboard
  };

  return (
    <>
      <div id="piratevideo" className='player-wrapper' style={{ display:'grid', placeContent:'', width:'100vw', transition: 'all 1s ease-in-out'}}>

        {/* Share Dialog */}
        <div className="share-dialog" style={{ display: showShareDialog ? 'block' : 'none', zIndex:'5' }}>
          <h3 className="dialog-title">Install PIRATE</h3>
          <button className="close-button" onClick={closeShareDialog}>Close</button>
          {/* <div className="targets">
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
          </div> */}
          {/* Display current URL with query string and button to copy to clipboard */}
          <div className="link">
            <div className="pen-url" style={{maxWidth:'340px'}}>{window.location.href}</div>
            <button className="copy-link" onClick={copyToClipboard}>Copy Link</button>
          </div>
        </div>

        {/* Share Button */}
        <button className="share-button" onClick={handleShareButtonClick}>Share</button>

        {/* Rest of the component code */}
        {/* Form Container */}
        <div className="form-container controller font" style={{position:'relative', zIndex:'4', top:'0', height:'auto', width:'100vw', margin:'0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background:'var(--theme-ui-colors-headerColor)'}}>
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop:'1.5vh' }}>
            <form className="youtubeform frontdrop" onSubmit={handleSubmit} id="youtubeform" name="youtubeform">
              {/* Insert your form elements here */}
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
              {/* Reset Button */}
              <button type="reset" onClick={handleReset} style={{ color: '', fontSize:'clamp(.8rem,1.5vw,2rem)', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
                Reset
              </button>
            </form>
          </div>
        </div>

        {/* ReactPlayer */}
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

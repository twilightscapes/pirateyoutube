import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import PageMenu from "../components/PageMenu";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../hooks/SiteMetadata"

const Video = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');

  const { proOptions } = useSiteMetadata();
  const { showBranding } = proOptions;

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

  const handleReset = () => {
    setYoutubelink(""); // Clear the input field value
    updateQueryString(""); // Clear the query string
  };

  const updateQueryString = (value) => {
    const newUrl = `${window.location.pathname}?video=${encodeURIComponent(value)}`;
    window.history.pushState({}, '', newUrl);
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
        <div className='player-wrapper'>
          {showBranding ? (
            <PageMenu />
          ) : (
            ""
          )}

          {/* Share Dialog */}
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

          {/* ReactPlayer */}
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

          {/* Form Container */}
          <div className="form-container controller font" style={{position:'relative', zIndex:'5', top:'0', marginTop:'0', height:'auto', padding:'2vh 2%', width:'100vw', background:'var(--theme-ui-colors-headerColor)'}}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <form className="youtubeform frontdrop" onSubmit={handleSubmit}id="youtubeform" name="youtubeform">
                {/* Insert your form elements here */}
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
                <button type="reset" onClick={handleReset} style={{ color: '', fontSize:'clamp(.8rem,1.5vw,2rem)', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
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

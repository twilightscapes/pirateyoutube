import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare  } from "react-icons/fa";

const YouTubePlayer = () => {
  const [youtubelink, setYoutubelink] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fillFormFromClipboard = () => {
      navigator.clipboard.readText().then((clipboardText) => {
        setYoutubelink(clipboardText);
        handleShow();
      });
    };

    fillFormFromClipboard();
  }, []); // Empty dependency array to run the effect only once

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
  };

  const handleShow = () => {
    setIsActive(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setYoutubelink("");
    setIsActive(false);
  };

  const finalUrl = youtubelink

  return (
    <>
      <div className='player-wrapper '>
        {youtubelink && (
          <ReactPlayer
            className='react-player'
            url={finalUrl}
            width='100vw'
            height='94vh'
            config={{
              youtube: {
                playerVars: { showinfo: 1, autoplay: 1, controls: 1, mute: 0 }
              },
            }}
            playing
            color="white"
            controls
            style={{position:'absolute', top:'0', zIndex:'0', maxHeight:'94vh', overflow:'hidden'}}
          />
        )}
      </div>

      <div className="form-container" style={{background:'var(--theme-ui-colors-headerColor)', padding:'0 2%'}}>
      {!isActive ? (
        
          <div style={{ maxWidth:'800px', margin:'0 auto'}}>
          <form className="youtubeform frontdrop" onSubmit={handleSubmit}>
      
              <a title="Go Home" href="https://youtube.com" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <ImYoutube2 style={{ fontSize: '50px' }} />
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
              onChange={handleShow}
              style={{ padding: '1vh 1vw', width:'100%', minWidth: '220px', outline: '1px solid #333', borderRadius: '', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="Paste Video Link"
              className="youtubelinker"
            />
            <button type="reset" onClick={handleReset} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>
          </div>
    
      ) : (

          <div style={{ maxWidth:'800px', margin:'0 auto'}}>
          <form className="youtubeform frontdrop" onSubmit={handleSubmit}>
          <a title="Go Home" href="https://youtube.com" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <ImYoutube2 style={{ fontSize: '50px' }} />
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
              onChange={handleShow}
              style={{ padding: '1vh 1vw', width:'100%', minWidth: '220px', outline: '1px solid #333', borderRadius: '', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="Paste Video Link"
              className="youtubelinker"
            />
            <button type="reset" onClick={handleReset} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>
          </div>
        
      )}
      </div>
    </>
  );
};

export default YouTubePlayer;

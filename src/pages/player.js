import React, { useState, useRef, useEffect, forwardRef } from "react";
import "../components/Control.css";
import ReactPlayer from "react-player";
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare  } from "react-icons/fa";
import PageMenu from "../components/PageMenu"
import { Container } from "@material-ui/core";
import Control from "../components/Control";
import useSiteMetadata from "../hooks/SiteMetadata"
// import { useState, useRef } from "react";
import { formatTime } from "../components/format";

let count = 0;
function App() {


  const { language } = useSiteMetadata();
  const { dicClickToView } = language;


  const { iconimage } = useSiteMetadata()

  const [youtubelink, setYoutubelink] = useState("");

  const fillFormFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setYoutubelink(clipboardText);
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  };

  useEffect(() => {
    fillFormFromClipboard();
  }, []); // Empty dependency array to run the effect only once

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
  };

  const handleInputClick = () => {
    fillFormFromClipboard(); // Trigger clipboard check manually
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add any additional logic you need on form submission
  };

  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.onfocus = () => {
      window.scrollBy(0, 0);
      document.body.scrollTop = 0;
    };
  });











  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);
  const finalUrl = youtubelink
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 1.0,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00";
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00";

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    //FastFowards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  //console.log("========", (controlRef.current.style.visibility = "false"));
  const progressHandler = (state) => {
    if (count > 3) {
      console.log("close");
      controlRef.current.style.visibility = "hidden"; // toggling player control container
    } else if (controlRef.current.style.visibility === "visible") {
      count += 1;
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    console.log(value);

    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };

  const bufferStartHandler = () => {
    console.log("Bufering.......");
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    console.log("buffering stoped ,,,,,,play");
    setVideoState({ ...videoState, buffer: false });
  };

  return (
    <div className="video_container">
      <div >
      <div
          className="pagemenu panel"
          style={{
            position: "fixed",
            top: "60px",
            zIndex: "3",
            left: "0",
            right: "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            maxWidth: "98vw",
            maxHeight:'80vh',
            margin: "0 auto",
            gap: "2vw",
            background: "rgba(0, 0, 0, .5)",
            padding: "",
            // border: "1px solid #666",
            borderRadius: "var(--theme-ui-colors-borderRadius)",
            textShadow: "0 1px 1px rgba(0, 0, 0, .7)",
            // fontSize: "clamp(2rem, 3vw, 3rem)",
            verticalAlign: "center",
            color:'#fff'
          }}
        >
<PageMenu />
        </div>
        <div className="player__wrapper" onMouseMove={mouseMoveHandler}>

          <ReactPlayer
            ref={videoPlayerRef}
            className="player"
            url={finalUrl}
            width="100vw"
            height="92vh"
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={progressHandler}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
          />

          {buffer && <p>Loading</p>}

          <Control
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onMouseSeekDown={onSeekMouseDownHandler}
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
            ref={inputElement}
            id="youtubelink-input"
              type="text"
              name="youtubelink"
              value={youtubelink}
              onInput={handleInputChange}
              // onClick={handleInputClick}
              // onChange={handleInputChange}
              style={{ padding: '1vh 1vw', width:'100%', minWidth: '220px', outline: '1px solid #333', borderRadius: 'var(--theme-ui-colors-borderRadius)', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="Paste Video Link"
              className="youtubelinker"
            />
            <button type="reset" onClick={() => setYoutubelink("")} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>
          </div>
      </div>
      </div>
    </div>
  );
}

export default App;

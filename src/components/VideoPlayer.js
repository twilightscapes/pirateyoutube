import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { TfiYoutube } from "react-icons/tfi";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import useSiteMetadata from "../hooks/SiteMetadata";
import PageMenu from "../components/PageMenu";

const VideoPlayer = ({ location }) => {
    // State initialization
    const [queryParams] = useState(new URLSearchParams(location.search));
    const proParam = queryParams.get('pro') === 'true';
    const videoUrlParam = queryParams.get('video');
    const startTimeParam = queryParams.get('start');
    const stopTimeParam = queryParams.get('stop');

    const loopParam = queryParams.get('loop') === 'true';
    const muteParam = queryParams.get('mute') === 'true';
    const controlsParam = queryParams.get('controls') === 'true';

    const autoplayParam = queryParams.get('autoplay') === 'true'; 
    const seoTitleParam = queryParams.get('seoTitle') || ''; 
    
    const [customImage, setCustomImage] = useState("");

    const [showPro, setShowPro] = useState(proParam || (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('showPro'))) || false);
    const [showBlocker, setShowBlocker] = useState(false);
    const [hideEditor, setHideEditor] = useState(false);

    // const [hideEditor, setHideEditor] = useState(true); // Default value set to true

    // Function to update hideEditor state
    // const toggleHideEditor = () => {
    //   setHideEditor((prevHideEditor) => !prevHideEditor);
    // };


// Function to handle changes in the custom image URL input
const handleCustomImageChange = (event) => {
    const { value } = event.target;
    setCustomImage(value);

    // Update query string with custom image URL
    updateQueryString({ customImage: value });
};


    const [seoTitle, setSeoTitle] = useState(seoTitleParam);
    
    // Effect to update localStorage and showPro state
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('showPro', JSON.stringify(showPro));
            const storedShowPro = JSON.parse(localStorage.getItem('showPro'));
            setShowPro(storedShowPro !== null ? storedShowPro : proParam);
        }
    }, [showPro, proParam, queryParams]);




    // Additional state and variables initialization
    const [shouldPause, setShouldPause] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const { featureOptions, proOptions } = useSiteMetadata();
    const { showNav } = featureOptions;
    const { showBranding } = proOptions;
    const inputElement = useRef(null);
    const playerRef = useRef(null);
    const [youtubelink, setYoutubelink] = useState(videoUrlParam || "");
    const [startTime, setStartTime] = useState(() => {
        const parsedStartTime = parseFloat(startTimeParam);
        return isNaN(parsedStartTime) ? "" : parsedStartTime.toFixed(2);
    });
    const [stopTime, setStopTime] = useState(() => {
        const parsedStopTime = parseFloat(stopTimeParam);
        return isNaN(parsedStopTime) ? "" : parsedStopTime.toFixed(2);
    });
    const [loop, setLoop] = useState(loopParam);
    const [mute, setMute] = useState(muteParam);

    const [autoplay, setAutoplay] = useState(autoplayParam);

    const [controls, setControls] = useState(controlsParam !== undefined ? JSON.parse(controlsParam) : true);
    const [copied, setCopied] = useState(false);

    // Effect to update showBlocker state based on query string
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const showBlockerParam = params.get('showBlocker');
        setShowBlocker(showBlockerParam === 'false');
    }, []);

    // Function to handle input change for video URL, start time, stop time, loop, mute, and controls
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
    
        let formattedValue = value.trim() !== '' && !isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : '';
    
        if (type === 'checkbox') {
            if (name === 'mute') {
                setMute(checked);
            } else if (name === 'controls') {
                setControls(checked);
            } else if (name === 'autoplay') {
                setAutoplay(checked);
            } else if (name === 'hideEditor') {
                setHideEditor(checked); 
            } else if (name === 'showBlocker') {
                setShowBlocker(checked); 
            } else {
                setLoop(checked);
            }
        } else {
            if (name === 'video') {
                setYoutubelink(value);
                setAutoplay(true);
                setControls(true);
            } else if (name === 'start') {
                setStartTime(formattedValue);
            } else if (name === 'stop') {
                setStopTime(formattedValue);
            } else if (name === 'seoTitle') {
                setSeoTitle(value);
            }
        }
    
        // Update query string with all parameters
        updateQueryString({ 
            video: youtubelink, 
            start: startTime, 
            stop: stopTime, 
            loop, 
            mute, 
            controls, 
            autoplay, // Here, autoplay is already a boolean value
            seoTitle, 
            hideEditor, 
            showBlocker 
        });
    };
    


    // Effect to initialize query parameters when the component mounts
    useEffect(() => {
        // Update autoplay if present in query parameters
        if (autoplayParam !== undefined) {
            setAutoplay(autoplayParam === 'true');
        }
        // Declare hideEditorParam and showBlockerParam variables
        const hideEditorParam = queryParams.get('hideEditor');
        const showBlockerParam = queryParams.get('showBlocker');
        // Update hideEditor if present in query parameters
        if (hideEditorParam !== null) {
            setHideEditor(hideEditorParam === 'true');
        }
        // Update showBlocker if present in query parameters
        if (showBlockerParam !== null) {
            setShowBlocker(showBlockerParam === 'true');
        }


        // Update query parameters with default values
        updateQueryString({
            video: videoUrlParam,
            start: startTimeParam,
            stop: stopTimeParam,
            loop: loopParam,
            mute: muteParam,
            controls: controlsParam,
            autoplay: autoplayParam === undefined ? false : autoplayParam,
            seoTitle: seoTitleParam,
            hideEditor: hideEditorParam === null ? false : hideEditorParam === 'true',
            showBlocker: showBlockerParam === null ? false : showBlockerParam === 'true',
        });
    }, [autoplayParam, controlsParam, startTimeParam, stopTimeParam, loopParam, muteParam, seoTitleParam, videoUrlParam, queryParams]);





    // Effect to handle invalid start and stop times
    useEffect(() => {
        if (isNaN(parseFloat(startTime))) {
            setStartTime("");
        }
        if (isNaN(parseFloat(stopTime))) {
            setStopTime("");
        }
    }, [startTime, stopTime]);

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidURL(youtubelink)) {
            if ((startTime === "" || !isNaN(parseFloat(startTime))) && (stopTime === "" || !isNaN(parseFloat(stopTime)))) {
                updateQueryString({ video: youtubelink, start: startTime, stop: stopTime, loop, mute, controls, seoTitle, showBlocker, hideEditor }); 
            } else {
                alert('Please enter valid values for start and stop times.');
            }
        } else {
            alert('Please enter a valid URL for the video.');
        }
    };

    // Function to reset form fields
    const handleReset = () => {
        setYoutubelink("");
        setStartTime("");
        setStopTime("");
        setLoop(false);
        setMute(false);
        setControls(true);
        updateQueryString({ video: "", start: "", stop: "", loop: false, mute: false, controls: true });
    };





    



    // Function to copy URL to clipboard

// Function to copy URL to clipboard
const handleCopyAndShareButtonClick = async () => {
    // Retrieve autoplay value from query parameters
    const autoplayQueryParam = queryParams.get('autoplay') === 'true';

    if (typeof window !== 'undefined') {
        if (navigator.share) { 
          navigator.share({
            title: 'PIRATE',
            url: window.location.href
          }).then(() => {
            console.log('Thanks for being a Pirate!');
          })
          .catch(console.error);
        }
      }

    // Construct the query parameters
    const queryParamsObject = {
        video: youtubelink,
        start: startTime,
        stop: stopTime,
        loop,
        mute,
        controls,
        autoplay: autoplayQueryParam, // Use the retrieved autoplay value
        seoTitle,
        hideEditor,
        showBlocker,
        customImage, // Include customImage parameter
    };

    // Remove any undefined or empty parameters
    Object.keys(queryParamsObject).forEach(key => {
        if (queryParamsObject[key] === undefined || queryParamsObject[key] === '') {
            delete queryParamsObject[key];
        }
    });

    // Update the query string
    const newParams = new URLSearchParams(queryParamsObject);

    // Construct the URL
    const newUrl = `${window.location.origin}${window.location.pathname}?${newParams.toString()}`;

    // Copy the URL to clipboard
    navigator.clipboard.writeText(newUrl)
        .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => console.error("Error copying to clipboard:", error));


        if (typeof window !== 'undefined') {
            if (navigator.share) { 
              navigator.share({
                title: 'PIRATE',
                url: window.location.href
              }).then(() => {
                console.log('Thanks for being a Pirate!');
              })
              .catch(console.error);
            }
          }  
};












    // Function to handle starting the video from the playhead position
    const handleStartFromPlayhead = () => {
        const currentTime = playerRef.current.getCurrentTime();
        setStartTime(currentTime.toString());
    };

    // Function to handle ending the video from the playhead position
    const handleEndFromPlayhead = () => {
        const currentTime = playerRef.current.getCurrentTime();
        setStopTime(currentTime.toString());
    };




    // Function to update query string based on provided values
const updateQueryString = (values) => {
    // This function does nothing to prevent updating the query string
};



    // Function to update query string based on provided values
    // const updateQueryString = (values) => {
    //     const { video, start, stop, loop, mute, controls, autoplay, seoTitle, hideEditor, showBlocker } = values;
    
    //     // Format start and stop values only if they are not NaN
    //     const formattedStart = isNaN(parseFloat(start)) ? "" : parseFloat(start).toFixed(2);
    //     const formattedStop = isNaN(parseFloat(stop)) ? "" : parseFloat(stop).toFixed(2);
    
    //     // Convert autoplay to string
    //     const autoplayValue = autoplay ? 'true' : 'false';
    
    //     // Construct the base URL with mandatory parameters
    //     let newUrl = `${window.location.pathname}?video=${encodeURIComponent(video)}&start=${encodeURIComponent(formattedStart)}&stop=${encodeURIComponent(formattedStop)}&loop=${loop}&mute=${mute}&controls=${controls}&autoplay=${autoplayValue}`;
    
    //     if (seoTitle !== undefined) {
    //         newUrl += `&seoTitle=${encodeURIComponent(seoTitle)}`;
    //     }
    
    //     if (hideEditor !== undefined) {
    //         newUrl += `&hideEditor=${hideEditor ? 'true' : 'false'}`;
    //     }
    
    //     if (showBlocker !== undefined) {
    //         newUrl += `&showBlocker=${showBlocker ? 'true' : 'false'}`;
    //     }
    
    //     window.history.pushState({}, '', newUrl);
    // };
    


    // Function to handle hide editor change
    const handleHideEditorChange = (event) => {
        const newValue = event.target.checked;
        setHideEditor(newValue);
        updateQueryString({ hideEditor: newValue ? 'true' : 'false' });
    };
    

    // Function to handle show blocker change
    // const handleShowBlockerChange = (event) => {
    //     const newValue = event.target.checked;
    //     setShowBlocker(newValue);
    //     updateQueryString({ showBlocker: newValue ? 'true' : 'false' });
    // };


// Function to handle autoplay change
const handleAutoplayChange = (event) => {
    const newValue = event.target.checked;
    setAutoplay(newValue);
    // Update query string with new autoplay value
    updateQueryString({ autoplay: newValue }); // Update query string with new autoplay value
};



    // Function to check if URL is valid
    const isValidURL = (url) => {
        const urlPattern = /^(|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

        // Function to check if the app is running in standalone mode
        function isRunningStandalone() {
            if (typeof window !== 'undefined') {
                return window.matchMedia('(display-mode: standalone)').matches;
            }
            return false;
        }

    // Check if a video is active
    const isVideoActive = youtubelink !== "";

    // Effect to handle isPlaying state
    useEffect(() => {
        setIsPlaying(!shouldPause && (loop || !stopTime || playerRef.current.getCurrentTime() < parseFloat(stopTime)));
    }, [loop, shouldPause, stopTime]);

    // JSX rendering
    return (
        <>
              <div id="piratevideo" className='player-wrapper' style={{ display: 'grid', placeContent: '', height:'auto',  width: '100vw', transition: 'all 1s ease-in-out' }}>



            {showPro ? (

<div className="font" style={{ position: 'relative', zIndex: '3', top: '0', width: '100vw', margin: '0 auto', transition: 'all 1s ease-in-out', marginTop: showNav ? '0' : '0',
//  height: hideEditor ? '0' : '50px', 
// background: 'var(--theme-ui-colors-headerColor)',
 }}>

                <form 
      className="youtubeform1 frontdrop1" 
      onSubmit={handleSubmit}  
      id="youtubeform" 
      name="youtubeform" 
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: '',
        alignItems: 'center',
        margin: '0 auto',
        gap: '2vw',
        padding: '4px 20px',
        width: '100%',
        // transform: hideEditor ? 'translateY(-100%)' : 'none',
        transition: 'transform 0.5s ease-in-out',
        background: 'var(--theme-ui-colors-headerColor)',
        // height: hideEditor ? '0' : 'auto'

      }}
    >

<div id="bigbox" style={{ display: 'flex', flexFlow:'', flexDirection:'', gap: '2vw', alignItems: 'center', width:'', border:'0px solid red' }}>


<div id="controls" style={{
  display: 'flex',
  flexDirection: 'row',
  gap: '4vw',
  alignItems: 'center',
  width: '', 
  transition: 'opacity .5s ease-in-out',
  opacity: isVideoActive ? 1 : 0.5 
}}>

<div id="checkboxes" style={{ display: 'flex', flexDirection:'row', gap: '5px', alignItems: 'center', padding:'0 10px 5px 10px', justifyContent:'center', background:'rgba(0,0,0,.2)', outline:'1px solid #777', borderRadius:'var(--theme-ui-colors-borderRadius)', fontSize:'clamp(.5rem,1.2vw,1rem)'  }}>

<label title="AutoPlay - Set video to automatically begin playing. NOTE: videos must be muted for autoplay to work" htmlFor="autoplayCheckbox" style={{textAlign:'center', fontSize:'60%', display:'flex', flexDirection:'column', alignItems:'center', opacity: isVideoActive ? 1 : 0.5 }}>Autoplay:
    <input
        type="checkbox"
        id="autoplay-checkbox"
        className="youtubelinker"
        checked={autoplay}
        onChange={handleAutoplayChange} 
        disabled={!isVideoActive}
    />
</label>

                                <label htmlFor="loop-checkbox" style={{textAlign:'center', fontSize:'70%', display:'flex', flexDirection:'column', alignItems:'center', opacity: isVideoActive ? 1 : 0.5}}>Loop:
                                    <input
                                        aria-label="Set to loop"
                                        id="loop-checkbox"
                                        type="checkbox"
                                        name="loop"
                                        checked={loop}
                                        className="youtubelinker"
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                                <label htmlFor="mute-checkbox" style={{textAlign:'center', fontSize:'70%', display:'flex', flexDirection:'column', alignItems:'center', opacity: isVideoActive ? 1 : 0.5}}>Mute:
    <input
    aria-label="Set to mute"
    id="mute-checkbox"
    type="checkbox"
    name="mute"
    checked={mute}
    className="youtubelinker"
    onChange={handleInputChange}
    disabled={!isVideoActive}
    style={{maxWidth:'50px'}}
    {...(mute ? { mute: 'true' } : {})}
/>
                                </label>

                                
                                <label htmlFor="controls-checkbox" style={{textAlign:'center', fontSize:'70%', display:'flex', flexDirection:'column', alignItems:'center', opacity: isVideoActive ? 1 : 0.5}}>Controls:
                                    <input
                                        aria-label="Set to show controls"
                                        id="controls-checkbox"
                                        type="checkbox"
                                        name="controls"
                                        className="youtubelinker"
                                        checked={controls}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>

<label htmlFor="hide-editor-checkbox" style={{textAlign:'center', fontSize:'70%', display:'flex', flexDirection:'column', alignItems:'center', opacity: isVideoActive ? 1 : 0.5}}>Editor:
<input
    type="checkbox"
    id="hide-editor-checkbox"
    name="hideEditor"
    className="youtubelinker"

    disabled={!isVideoActive}

    onChange={handleHideEditorChange} checked={hideEditor}
    // checked={hideEditor}
    // onChange={handleHideEditorInputChange}
/>
</label>
                </div>

{/* <div style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', padding:'0 3px 5px 3px', background:'rgba(0,0,0,.2)', outline:'1px solid #333', borderRadius:'5px' }}> */}



<input
    type="text"
    name="seoTitle" 
    title="Enter Video Title"
    value={seoTitle}
    onChange={(e) => setSeoTitle(e.target.value)} // Add this onChange handler
    placeholder="Video Title" 
    style={{ padding: '.5vh .4vw', minWidth:'100px', width: '100%', maxWidth: '800px', fontSize: 'clamp(.8rem,1.4vw,1rem)', background:'rgba(0,0,0,.2)', transition: 'all 1s ease-in-out', opacity: isVideoActive ? 1 : 0.5 }}
    aria-label="Enter Video Title"
    className="youtubelinker"
    disabled={!isVideoActive}
/>

{/* <label  title="User Interaction Blocker - Keep people from clicking on anything on the page. Note, view will not be able to play videos that are NOT set to mute and autoplay - USE WITH CAUTION" htmlFor="blocker-checkbox"  style={{textAlign:'center', fontSize:'60%', display:'none', flexDirection:'column', alignItems:'center', opacity: 'isVideoActive ? 1 : 0.5'}}>Block:
    <input
        aria-label="Block user interactions"
        id="blocker-checkbox"
        type="checkbox"
        className="youtubelinker"
        name="showBlocker"
        checked={showBlocker}
        onChange={handleBlockerChange}
        onChange={handleShowBlockerChange} checked={showBlocker}
        disabled={!isVideoActive}
        style={{maxWidth:'50px'}}
    />
</label> */}



{/* </div> */}



<div id="timers" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', width:'100%', marginLeft:'',}}>
<input
    aria-label="Start Time"
    id="start-input"
    className="youtubelinker"
    type="text"
    name="start"
    title="Start Time - Set video start time"
    value={isNaN(parseFloat(startTime)) ? '' : parseFloat(startTime).toFixed(2)}
    onChange={handleInputChange}
    onClick={handleStartFromPlayhead} 
    placeholder={!startTime && 'Start'} 
    disabled={!isVideoActive}
    style={{ maxWidth: '70px', fontSize: 'clamp(.7rem,.6vw,1rem)', textAlign: 'center',background:'rgba(0,0,0,.3)' }}
/>
<input
    aria-label="Stop Time"
    id="stop-input"
    className="youtubelinker"
    type="text"
    name="stop"
    title="Stop Time - Set video stop time"
    value={isNaN(parseFloat(stopTime)) ? '' : parseFloat(stopTime).toFixed(2)}
    onChange={handleInputChange}
    onClick={handleEndFromPlayhead} 
    placeholder={!stopTime && 'Stop'} 
    disabled={!isVideoActive}
    style={{ maxWidth: '70px', fontSize: 'clamp(.7rem,.6vw,1rem)', textAlign:'center',background:'rgba(0,0,0,.3)' }}
/>

</div>

</div>



<div id="pastebox" style={{ display: 'flex', flexDirection:'row', gap: '2vw', alignItems: 'center', width:'', margin:'', border:'0px solid red' }}>





<input
                type="text"
                name="customImage" 
                title="Custom Image Url"
                value={customImage}
                onChange={handleCustomImageChange}
                placeholder="Image URL" 
                style={{ padding: '.5vh .4vw', minWidth:'100px', width: '100%', maxWidth: '800px', fontSize: 'clamp(.8rem,1.4vw,1rem)', background:'rgba(0,0,0,.2)', transition: 'all 1s ease-in-out', opacity: isVideoActive ? 1 : 0.5 }}
                aria-label="Custom Image Url"
                className="youtubelinker"
                disabled={!isVideoActive}
            />

                    
                            <input
                                ref={inputElement}
                                id="youtubelink-input"
                                type="text"
                                name="video"
                                title="Paste Video Link"
                                value={youtubelink}
                                onChange={handleInputChange}
                                style={{ padding: '.5vh .4vw', minWidth:'85px', width: '100%', maxWidth: '500px', fontSize: 'clamp(.6rem,1vw,1rem)', transition: 'all 1s ease-in-out', background:'rgba(0,0,0,.4)', outline:'0px solid #333', border:'1px solid var(--theme-ui-colors-siteColor)' }}
                                placeholder="Paste Link"
                                className="youtubelinker"
                                aria-label="Paste Link To Video"
                            />


<div style={{display: 'flex', flexDirection:'row', gap: '20px', alignItems: 'center', padding:'3px 10px', background:'rgba(0,0,0,.2)', outline:'1px solid #333', borderRadius:'var(--theme-ui-colors-borderRadius)', opacity: isVideoActive ? 1 : 0.5}}>

<button title="Reset to start over" aria-label="Reset" type="reset" onClick={handleReset} disabled={!isVideoActive} style={{ color: '', fontSize: 'clamp(.8rem,1vw,1rem)', fontWeight: 'bold', textAlign: 'left', width: '15px', margin: '0 10px 0 0' }}>Reset</button>

<button aria-label="Create Link" onClick={handleCopyAndShareButtonClick} disabled={!isVideoActive} style={{ display: "flex", gap: '.5vw', justifyContent: "center", padding: ".6vh .5vw", width:'100%', minWidth:'60px', maxHeight: "", margin: "0 auto", textAlign: 'center', fontSize: '14px', fontWeight: 'light', textShadow: '0 1px 0 #444', marginLeft:'15px', }} className="button font print">
{copied ? 'Link Copied' : 'Copy Link'}
</button>

</div>



</div>

</div>

                            {isRunningStandalone() && (
                            <div style={{position:'absolute', left:'0', top:'50vh', zIndex:'2', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2vh', width:'55px',padding:'3px 10px', background:'rgba(0,0,0,.2)', outline:'1px solid #333', borderRadius:'var(--theme-ui-colors-borderRadius)'}}>
                                    <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                                        <TfiYoutube style={{ fontSize: '30px', opacity:'.8' }} />
                                    </a>
                                    <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                                        <FaFacebookSquare style={{ fontSize: '30px', opacity:'.8' }} />
                                    </a>
                                    <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                                        <FaTwitch style={{ fontSize: '30px', opacity:'.8' }} />
                                    </a>
                                </div>
                             )}
                        
                    
                    </form>

                    </div>




                
    ) : (



        

<div className="font public" style={{display: hideEditor ? 'none' : 'flex', position: 'relative', zIndex: '3', top: '0', width: '100vw', margin: '0 auto', marginTop: showNav ? '0' : '', transition: 'all 1s ease-in-out', 
// height: hideEditor ? '0' : '50px', 
// background: 'var(--theme-ui-colors-headerColor)',
 }}>

<form 
className="youtubeform1 frontdrop1" 
onSubmit={handleSubmit}  
id="youtubeform" 
name="youtubeform" 
style={{
display: 'flex',
justifyContent: 'center',
flexWrap: 'wrap',
alignItems: 'center',
width: '100vw',
margin: '0 auto',
gap: '2vw',
padding: '1vh 2vw',
// transform: hideEditor ? 'translateY(-100%)' : 'none',
transition: 'transform 0.2s ease-in-out',
background: 'var(--theme-ui-colors-headerColor)',
// height: hideEditor ? 'auto' : '0'

}}
>

<div id="bigbox" style={{ display: 'flex', flexDirection:'column', gap: '4px', alignItems: 'center', width:'100%', border:'0px solid red' }}>

<div id="pastebox" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', width:'', minWidth:'90%', justifyContent:'center', margin:'0 auto', border:'0px solid red' }}>


<input
                                ref={inputElement}
                                id="youtubelink-input"
                                type="text"
                                name="video"
                                title="Paste Video Link"
                                value={youtubelink}
                                onChange={handleInputChange}
                                style={{ padding: '.5vh .4vw', minWidth:'85px', width: '100%', maxWidth: '400px', fontSize: 'clamp(.6rem,1vw,1rem)', transition: 'all 1s ease-in-out', background:'rgba(0,0,0,.2)', outline:'1px solid #999', border:'1px solid var(--theme-ui-colors-siteColor)' }}
                                placeholder="Paste Video Link"
                                className="youtubelinker"
                                aria-label="Paste Link To Video"
                            />

                            <button aria-label="Reset" type="reset" onClick={handleReset} disabled={!isVideoActive} style={{ color: '', fontSize: 'clamp(.8rem,1vw,1rem)', fontWeight: 'bold', textAlign: 'left', width: '20px', margin: '', opacity: isVideoActive ? 1 : 0.5 }}>
                                Reset
                            </button>
</div>








</div>


                        
                    
                    </form>


                    {isRunningStandalone() && (
                            <div style={{position:'absolute', left:'0', top:'50vh', zIndex:'2', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2vh', width:'55px',padding:'3px 10px', background:'rgba(0,0,0,.2)', outline:'1px solid #333', borderRadius:'var(--theme-ui-colors-borderRadius)'}}>




                                    <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                                        <TfiYoutube style={{ fontSize: '30px', opacity:'.8' }} />
                                    </a>
                                    <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                                        <FaFacebookSquare style={{ fontSize: '30px', opacity:'.8' }} />
                                    </a>
                                    <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                                        <FaTwitch style={{ fontSize: '30px', opacity:'.8' }} />
                                    </a>
                                </div>
                             )}

                    </div>
      
    )}

{!showBranding ? (
<PageMenu />
) : (
""
)}


{/* <div className={showBlocker ? "blocked-video" : ""}></div> */}
<ReactPlayer
    id="PiratePlayer"
    ref={playerRef}
    allow="web-share"
    style={{
        position: 'relative',
        top: '0',
        margin: '0 auto 0 auto',
        zIndex: '1',
        overflow: 'hidden',
        width: '100vw',
        minHeight: '',
        height: '100%',
        background: 'transparent',
        transition: 'all 1s ease-in-out',
    }}
    width="100%"
    height="100%"
    url={youtubelink}
    playing={isPlaying}
    controls={controls}
    playsinline
    loop={loop}
    muted={mute} // Use muted instead of mute
    volume={mute ? 0 : 1}
    autoPlay={autoplay}
    onStart={() => console.log('onStart')}
    onPause={() => setIsPlaying(false)}
    onEnded={() => setIsPlaying(false)}
    onPlay={() => setIsPlaying(true)}
    config={{
        youtube: {
            playerVars: { showinfo: false, autoplay: autoplay ? 1 : 0, controls: controls ? 1 : 0, mute: mute ? 1 : 0 } 
        },
    }}
    onReady={() => {
        if (startTime) {
            playerRef.current.seekTo(parseFloat(startTime));
        }
    }}
    onProgress={({ playedSeconds }) => {
        if (!shouldPause && stopTime && parseFloat(stopTime) !== 0 && playedSeconds >= parseFloat(stopTime)) {
            console.log('Stopping video at stop time:', stopTime);
            if (loop) {
                if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                    playerRef.current.seekTo(parseFloat(startTime));
                } else {
                    console.error('Error: playerRef.current is not properly initialized or does not expose seekTo function');
                }
            } else {
                setShouldPause(true);
            }
        }
    }}
/>



            </div>
        </>
    );
};

export default VideoPlayer;
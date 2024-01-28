import React from "react"
import { useState, useRef, useEffect, forwardRef } from "react";
import { graphql, Link } from "gatsby"
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";
import HomePosts from "../components/HomePosts";
import Seo from "../components/seo";
import { getSrc } from "gatsby-plugin-image";
import useSiteMetadata from "../hooks/SiteMetadata";
import { GatsbyImage } from "gatsby-plugin-image"
import Social from "../components/social"
import PropTypes from "prop-types";
import ReactPlayer from 'react-player/lazy'
import { ImPlay } from "react-icons/im"
import { MdVolumeUp } from "react-icons/md"
import { MdPlayArrow } from "react-icons/md"
import { MdPause } from "react-icons/md"
import { MdVolumeOff } from "react-icons/md"
// import { FaRegPlusSquare } from 'react-icons/fa';
// import { IoShareOutline } from 'react-icons/io5';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { StaticImage } from "gatsby-plugin-image"
const HomePage = ({ data }) => {

  const { language, proOptions, siteUrl  } = useSiteMetadata();

  const { showProfile, showDefault, showFeature } = proOptions

  const { dicClickToView , dicPlayVideo} = language;

  
  const { markdownRemark } = data;
  const { frontmatter, html, excerpt } = markdownRemark;

  const FrontImage = frontmatter.featuredImage
  ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
  : ""

  const SecondaryImage = frontmatter.secondaryImage
  ? frontmatter.secondaryImage.childImageSharp.gatsbyImageData
  : ""

  const UnderlayImage = frontmatter.underlayImage
  ? frontmatter.underlayImage.childImageSharp.gatsbyImageData
  : null;
  
  const ProfText = frontmatter.profText
  const { showCover } = useSiteMetadata()
      const { showSocial } = useSiteMetadata()
      // const SkillsText = frontmatter.skillsText
      const coverText = frontmatter.coverletter.coverText
      const YouTube2 = frontmatter.youtube.youtuber2
      const YouTube = frontmatter.youtube.youtuber

  const CommonElements = ({ title, tagline, description }) => (
    <div className=" mob print" style={{ position:'sticky', top:'0', fontSize: 'clamp(1rem, 1.5vw, 3.2rem)' }}>
      <h1 className="title1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>{title}</h1>
      <h2 className="tagline1" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 3.2rem)' }}>
        {tagline}
      </h2>
      <div style={{ fontSize: 'clamp(1.2rem, 1.8vw, 3.2rem)' }} className="description" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );





  // Check if localStorage is available
  const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

  // Set the initial state directly from localStorage if available, otherwise set to true
  const storedValue = isLocalStorageAvailable ? localStorage.getItem("isSliderVisible") : null;
  const initialSliderVisible = storedValue ? JSON.parse(storedValue) : showDefault;

  const [isSliderVisible, setIsSliderVisible] = useState(initialSliderVisible);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      // Update isSliderVisible when it changes in localStorage
      const handleStorageChange = () => {
        const storedValue = localStorage.getItem("isSliderVisible");
        try {
          setIsSliderVisible(JSON.parse(storedValue) ?? true);
        } catch (error) {
          setIsSliderVisible(true);
        }
      };

      // Add event listener for storage change
      window.addEventListener("storage", handleStorageChange);

      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [isLocalStorageAvailable]);






  const ContentinVideo = frontmatter.contentinvideo
  // const LiarLiar = frontmatter.liarliar
  
    /* eslint-disable-next-line no-unused-vars */
      const CtaLink = frontmatter.cta.ctaLink
  
      // const { iconimage } = useSiteMetadata()
      

   /* eslint-disable no-useless-escape */
const extractVideoId = (url) => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/[^\/\n\s]+\/(?:\S+\/)?|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};
/* eslint-enable no-useless-escape */
  


const playerRef = useRef(null);
const [playingIndex, setPlayingIndex] = useState(null);

  const handleVideoPlay = (index) => {
    setPlayingIndex(index);
  };

  const handleVideoPause = () => {
    setPlayingIndex(null);
  };
  

  
  
  const Svg = frontmatter.svgImage;
  
  function AddSvg() {
    if (!Svg) {
      return null; // or you can return a default SVG or placeholder
    }
  
    const svgUrl = Svg.publicURL;
  
    return (
      <object
        className="animator"
        id=""
        data={svgUrl}
        type="image/svg+xml"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          overflow: '',
          border: '0px solid red',
          zIndex: '',
          aspectRatio: '',
          width: '100vw',
          background: 'transparent',
          objectFit: 'cover'
        }}
        alt="animated content"
        title="animated content"
      ></object>
    );
  }
  
  
  
  
  
  

  
    if (!YouTube) {
  
    }
    else{
      
      <Iframer />
    }
  
  function Iframer() {
    
      return (
        <div className="wrap-element effects" style={{aspectRatio:'16/9', minHeight:'300px', width:'100vw', maxHeight:'100vh', overFlow:'hidden'}}>
  
  
  {YouTube ? (
    <div>
  

  <ReactPlayer
                playing="true"
                ref={playerRef}
                url={frontmatter.youtube.youtuber}
                  allow="web-share"
                  style={{ position: 'absolute', top:'0', margin: '0 auto 0 auto', zIndex: '1',aspectRatio:'16/9', }}
                  width="100vw"
                  height="100%"
                  className='inline'
                  playsinline
                  // className={`relative ${index === playingIndex ? 'fixed' : 'relative'}`}
            
                  // light={`https://i.ytimg.com/vi/${extractVideoId(frontmatter.youtube.youtuber)}/hqdefault.jpg`}
                  light='{frontmatter.underlayImage}'
                  config={{
                    file: {
                      attributes: {
                        crossOrigin: "anonymous",
                      },
                    },
                    youtube: {
                      playerVars: { showinfo: 0, autoplay: 1, controls: 1, mute: 0, loop: 1 },
                    },
                  }}
                  playIcon={
                    <div style={{display:'flex', flexDirection:'column', placeContent:'', justifyContent:'', position:'absolute', zindex:'1', top:'', fontWeight:'bold', padding:'3% 0 0 0', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
                      <div className="spotlight font" style={{}}>
                        <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                            <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                          </div>
                          {dicPlayVideo}
                        </div>
                      </div>
                    </div>}
                    onPlay={() => handleVideoPlay()}
                    onPause={handleVideoPause}
                />
  
  {/* PURPLE */}
              {/* <ReactPlayer
                allow="web-share"
                ref={playerRef}
                style={{position:'asbolute', zIndex:'99'}}
                width="100%"
                height="100%"
                  // url={[iframeUrl, Suggestion1, Suggestion2, Suggestion3]}
                url={iframeFiltered}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                muted={muted}
                playsinline
                config={{
                  file: {
                    attributes: {
                      samesite: "none",
                      crossOrigin: "anonymous",
                    },
                  },
                    youtube: {
                      playerVars: { showinfo:0, autoplay:YouTubeAutostart, controls:YouTubeControls, start:YouTubeStart, end:YouTubeEnd, mute:YouTubeMute, loop:YoutubeLoop }
                    }
                }}
                playIcon={
                  <div style={{position:'absolute',
                  // backgroundColor:'var(--theme-ui-colors-bodyBg)',
                  // backgroundColor:'rgba(0,0,0,0.6)',
                   width:'100vw', height:'100vh', minHeight:'40vh', maxHeight:'', zIndex:'0', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'center', justifyContent:'', 
                  color:'#ddd',
                  fontFamily:'Verdana, Sans-Serif, System' }}>
  
  
  
  <button aria-label="Click To Play" name="Click to play" className="clickplays videohide" style={{position:'relative', zIndex:'0', top:'', border:'0px  solid red', width:'100vw', background:'transparent', color:'', fontSize:'18px', textAlign:'center', display:'', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center',}}>
  
  
                  
  
  
  <div style={{display:'grid', placeContent:'center', position:'relative', zindex:'1', fontWeight:'bold', padding:'1vh 0', fontSize:'clamp(.6rem, 1.4vw, 2rem)', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', background:'linear-gradient(180deg, rgba(24, 23, 30, 0.2) 1%, rgba(0, 0, 0, .7) 99%)', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
  <ImPlay style={{margin:'0 auto', width:'50%', fontSize:'clamp(2rem, 4.4vw, 3rem)', filter:'drop-shadow(0px 0px 12px #fff',}} />
  Click to play
  </div>
  
  <div style={{fontSize:'clamp(1rem, 2vw, 2.5rem)', margin:'5vh 0 0 0', padding:'0 10px', maxWidth:'1000px'}}>
  {frontmatter.bumpertext ? (
  <h3>{frontmatter.bumpertext}</h3>
  ) : (
  <h3>{frontmatter.title}</h3>
  )}
  </div>
  </button>
  
  <button
  className="videohide" 
  aria-label="Click To Play" name="Click to play" 
  style={{
  color:'#ddd',
  width:'100vw', 
  height:'100vh',
  display:'grid',
  placeContent:'center',
  position:'absolute',
  top:'0',left:'0',right:'0',bottom:'0',
  zindex:'1'
  }}
  ></button>
  
              </div>
              }
              
              /> */}
    </div>
    ) : (
      ""
    
  )}
    
  
    
    
    {UnderlayImage ? (
                <GatsbyImage
                  image={UnderlayImage}
                  alt={frontmatter.title + " - image"}
                  className="mcboaty1"
                  style={{height:'auto', width:'', maxHeight:'100vh', overflow:'hidden', position:'absolute', left:'0', right:'0', bottom:'0', top:'', zIndex:'0',
                 objectFit:'cover', border:'0px solid red !important', background:'transparent',}}
                />
                
              ) : (
                ""
              )}
    
  
    
    {/*  SPECIAL CONTENT */}
    
    {ContentinVideo ? (
      <div id="contentvideo"
            className="blog-post-content effects" style={{ fontSize:'1.1rem', textAlign:'left', padding:'', margin:'0 auto', color:'inherit !important', border:'0px solid transparent', position:'absolute', bottom:'0', left:'0', top:'0', right:'0', zindex:'-1', maxHeight:'100vh', borderBottom:'0px solid', }}
            dangerouslySetInnerHTML={{ __html: html }}
          >
            
          </div>
     ) : (
      ""
    )}
    
    
            
    {Svg ? (
      <AddSvg />
         ) : (
           ""
           )}
            </div>
      )
    }
  
    
    const YouTubeStart = frontmatter.youtube.youtubestart ? frontmatter.youtube.youtubestart : null;
    const YouTubeEnd = frontmatter.youtube.youtubeend
    const YouTubeMute = frontmatter.youtube.youtubemute
    const YouTubeControls = frontmatter.youtube.youtubecontrols
    const YouTubeAutostart = frontmatter.youtube.youtubeautostart
    const CustomControls = frontmatter.youtube.customcontrols
    const Suggestion1 = frontmatter.youtube.youtubersuggestion1


    let iframeFiltered;
    if (Suggestion1) {
      iframeFiltered = [
        frontmatter.youtube.youtuber,
        frontmatter.youtube.youtubersuggestion1,
        frontmatter.youtube.youtubersuggestion2,
        frontmatter.youtube.youtubersuggestion3,
      ];
    } else {
      iframeFiltered = frontmatter.youtube.youtuber;
    }


const YoutubeLoop = frontmatter.youtube.youtubeloop

const ClickToPlay = frontmatter.youtube.clicktoplay



    const AudioStart = frontmatter.audiostart
    const AudioEnd = frontmatter.audioend
    const AudioTitle = frontmatter.audiotitle
  
    function Iframer3() {
      const iframeUrl3 = "https://www.youtube.com/embed/" + frontmatter.youtube.youtuber2
      return (
        
  <div style={{marginTop:'10px', position:'relative', zIndex:'1',
  display:'flex', justifyContent:'center', maxHeight:'80px !important', height:'150px', border:'0px solid yellow', width:'100%'
  }}>
  
  
  <ReactPlayer
            allow="web-share"
            className='react-player67'
            url={iframeUrl3}
            width="250px"
            height="100%"
            style={{
              border:'0px solid red'
          }}
            config={{
              youtube: {
                playerVars: { showinfo:0, autoplay:1, controls:0, start:AudioStart, end:AudioEnd, mute:0,  }
              },
            }}
            loop
            playing
            playsinline
            playIcon={
              <button aria-label="Click To Play" className="clickplays" style={{position:'relative', zIndex:'0', top:'', border:'0px  solid red', width:'100vw', height:'', background:'transparent', color:'#fff', fontSize:'18px', textAlign:'center', display:'flex', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', paddingTop:'0', borderRadius:'12px'}}>
            
          <div className="" style={{position:'', top:'', zIndex:'0', textAlign:'center', animation:'fadeIn 3s', display:'flex', justifyContent:'center', width:'auto', marginBottom:''}}>
            
      
  
            <div className="popped" style={{display:'flex', width:'80%', minWidth:'300px', margin:'0 auto', fontWeight:'bold', padding:'.2rem .4rem', fontSize:'2rem', background:'rgba(0,0,0,0.30)', borderRadius:'12px', border:'1px solid #333', filter:'drop-shadow(2px 2px 2px #000)', textAlign:'center'}}>
              
              <div style={{fontSize:'.8rem', fontWeight:'', width:'100%', padding:'0 0 0 .3rem', filter:'drop-shadow(2px 2px 2px #000)', textAlign:'center'}}>
              I just listened to:<br />
  
  
  
              <div style={{fontSize:'1rem', fontWeight:'bold', marginTop:'5px' }}>{ AudioTitle }</div>
        
              <div style={{display:'flex', justifyContent:'center', marginTop:'5px'}}>
              <div><AiOutlineAudioMuted style={{margin:'0 auto', fontSize:'20px', filter:'drop-shadow(2px 2px 2px #000),', color:'#06f21a'}} /></div> &nbsp; <div>Click to listen </div>
              
              </div>
              </div>
  
            </div>
           
            </div>
            </button>}
     
              light="/assets/transparent.png"
            />
       </div>
  
      )
    }
  
    // const Playing  = useState(true);
  
    const [state, setState] = useState({
    playing: YouTubeAutostart,
    controls: YouTubeControls,
    light: ClickToPlay,
    muted: YouTubeMute,
    loop: YoutubeLoop,
  });


  const controlsRef = useRef(null);

  const {
    playing,
    controls,
    light,
    muted,
    loop,
    played,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };






  const Controls = forwardRef(
    (
      {
        // onSeek,
        // onSeekMouseDown,
        // onSeekMouseUp,
        // onDuration,
        // onRewind,
        onPlayPause,
        // onFastForward,
        playing,
        // played,
        // elapsedTime,
        // totalDuration,
        onMute,
        muted,
        // onVolumeSeekDown,
        // onChangeDispayFormat,
        // playbackRate,
        // onPlaybackRateChange,
        // onToggleFullScreen,
        volume,
        // onVolumeChange,
        // onBookmark,
      },
      ref
    ) => {
      // const classes = useStyles();
      // const [anchorEl, setAnchorEl] = React.useState(null);
      // const handleClick = (event) => {
      //   setAnchorEl(event.currentTarget);
      // };
  
      // const handleClose = () => {
      //   setAnchorEl(null);
      // };
  
      // const open = Boolean(anchorEl);
      // const id = open ? "simple-popover" : undefined;
  
      // const { iconimage } = useSiteMetadata()
  
  
      return (
  
  <div>
  
  
  
        {playing ? (
""
        ) : (

  
  

   


<div className="videohide1 554 pane1" style={{position:'absolute', height:'auto', aspectRatio:'16/9', width:'100vw', zIndex:'3', top:'', right:'0', textAlign:'center', display:'grid', placeContent:'', justifyContent:'', color:'var(--theme-ui-colors-text)', fontFamily:'Verdana, Sans-Serif, System' }}>




<div aria-label="Click To Play" className="clickplays videohide 555" style={{position:'relative', zIndex:'', top:'0', border:'0px  solid red', width:'100vw', height:'', minHeight:'300px', aspectRatio:'16/9', maxHeight:'', fontSize:'', textAlign:'center', display:'grid', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', padding:'2vh 0 0 0', background:'#111', color:'#ddd', transition:'all 2s ease-in-out', cursor:'pointer'}}>






          {/* // <div style={{position:'absolute', background:'#111', height:'100vh', width:'100vw', zIndex:'3', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'start', justifyContent:'center', color:'#fff', fontFamily:'Verdana, Sans-Serif, System' }}> */}

          {/* <img className="homepage-bg" src={iconimage} width="250px" height="150px" alt="UrbanFetish" style={{ width:'', margin:'120px auto 0 auto', filter:'drop-shadow(2px 2px 2px #000)', background:'transparent !important', position:'relative', top:''}} /> */}
{frontmatter.mediawarnings.marate ? (
<>
<div className="flex-items" style={{fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', margin:'0 auto 0 auto', textTransform:'uppercase',}}>The following is rated: <strong>{frontmatter.mediawarnings.marate}</strong></div>

<div className="flex-container" style={{display:'flex', flexDirection:'row', gap:'1vh', justifyContent:'center', alignItems:'center',  textAlign:'left', margin:'0 auto', color:'#ddd', background:'rgba(0, 0, 0, .8)', width:'auto', maxWidth:'800px', height:'', border:'1px solid #222', borderRadius:'12px', padding:'2vh 5vw' }}>


{frontmatter.mediawarnings.marate ? (
            <div className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>{frontmatter.mediawarnings.marate}</div>
            ) : (
              <div className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>PG</div>
            )}





<ul style={{display:'flex', flexDirection:'column', position:'relative', left:'', top:'', gap:'.8vh', justifyContent:'space-around', alignContent:'', alignItems:'start', border:'0px solid red', fontSize:'clamp(.5rem, 1.2vw, 2rem)'}}>


{frontmatter.mediawarnings.maratingtx1 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
            {frontmatter.mediawarnings.marating1}</strong> {frontmatter.mediawarnings.maratingtx1}</li>
            ) : (
              ""
            )}


{frontmatter.mediawarnings.maratingtx2 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating2}</strong> {frontmatter.mediawarnings.maratingtx2} </li>
            ) : (
              ""
            )}


{frontmatter.mediawarnings.maratingtx3 ? (
         <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating3}</strong> {frontmatter.mediawarnings.maratingtx3} </li>   
            ) : (
              ""
            )} 


{frontmatter.mediawarnings.maratingtx4 ? (
       <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating4}</strong> {frontmatter.mediawarnings.maratingtx4} </li>           
            ) : (
              ""
            )} 



</ul>

</div>

<div className="flex-items" style={{position:'relative', right:'', top:'', display:'', fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>{frontmatter.mediawarnings.viewerwarning}</div>
</>
) : (
                
  ""
  
      )}




         <div style={{display:'grid', placeContent:'center', position:'relative', zindex:'1', fontWeight:'bold', padding:'3% 0 0 0', fontSize:'clamp(.6rem, 1.4vw, 2rem)', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
<ImPlay style={{margin:'0 auto', width:'50%', fontSize:'clamp(2rem, 4.4vw, 3rem)', filter:'drop-shadow(0px 0px 12px #fff',}} />
{dicClickToView}
</div>




      

<div className="bumper" style={{fontSize:'clamp(1rem, 2vw, 2.5rem)', margin:'5vh 0 0 0', padding:'0 10px', maxWidth:'1000px'}}>
{frontmatter.bumpertext ? (
<h3>{frontmatter.bumpertext}</h3>
    ) : (
<h3>{frontmatter.title}</h3>
)}
</div>

<button aria-label="Video Play/Pause Button"
        onClick={onPlayPause}
        className="videohide 644 pane2" 
        style={{
         color:'#ddd',
         width:'100vw', 
         height:'',
         display:'grid',
         placeContent:'center',
         position:'absolute',
         aspectRatio:'16/9',
         top:'',left:'0',right:'0',bottom:'0',
         border:'0px solid blue',
         zindex:'1'
        }}
      ></button>
      
      
      </div>
      </div>




 )}
 {/* end playing check */}
  
 
  
  
        
  
  
  <div ref={ref} className="controlsbox" style={{width:'', height:'', border:'0px solid red', }}>
  
<button
        aria-label="Video Play/Pause Button"
        onClick={onPlayPause}
        className="videohide 679 pane3" 
        style={{
         color:'#ddd',
         width:'100vw', 
         height:'auto',
         display:'block',
         placeContent:'',
         position:'relative',
         aspectRatio:'16/9',
         top:'0',
         left:'0',
         right:'0',
         border:'0px solid yellow',
         zindex:'1', 
         cursor:'pointer'
        //  animation: 'fadeout 4s forwards'
        }}
      ></button>


  <div className="vidcontrols">
                  <button
                    onClick={onPlayPause}
                    className="controls panel" 
                    style={{
                      backgroundColor:'rgba(0,0,0, 0.6)',
                      color:'#999',
                      borderRadius:'', overFlow:'hidden'
                  }}
                  >
                    {/* <MdPlayArrow style={{fontSize:'50px', position:'absolute'}}  /> */}
                    {playing ? (
                      
                      <MdPause className="hudicon" style={{}} />
                      
                    ) : (
                
                <MdPlayArrow className="hudicon" style={{}}  />
                
                    )}
                  </button>
  
                  <button
                    // onClick={() => setState({ ...state, muted: !state.muted })}
                    onClick={onMute}
                    className="controls panel"
                    style={{
                      backgroundColor:'rgba(0,0,0, 0.6)',
                      color:'#999',
                      borderRadius:'', overFlow:'hidden'
                  }}
                  >
                    {muted ? (
                      <MdVolumeOff className="hudicon" fontSize="" style={{}}  />
                    ) : volume > 0.5 ? (
                      <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                    ) : (
                      <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                    )}
                  </button>
                  </div>

        </div>
        </div>
      );
    }
  );
  
  Controls.propTypes = {
    onSeek: PropTypes.func,
    onSeekMouseDown: PropTypes.func,
    onSeekMouseUp: PropTypes.func,
    onDuration: PropTypes.func,
    onRewind: PropTypes.func,
    onPlayPause: PropTypes.func,
    onFastForward: PropTypes.func,
    onVolumeSeekDown: PropTypes.func,
    onChangeDispayFormat: PropTypes.func,
    onPlaybackRateChange: PropTypes.func,
    onToggleFullScreen: PropTypes.func,
    onMute: PropTypes.func,
    playing: PropTypes.bool,
    light: PropTypes.bool,
    played: PropTypes.number,
    elapsedTime: PropTypes.string,
    totalDuration: PropTypes.string,
    muted: PropTypes.bool,
    playbackRate: PropTypes.number,
  };






  return (
    <Layout>
      <Helmet>
        <body id="body" className="homepage" />
      </Helmet>

      <Seo
        title={frontmatter.title}
        description={frontmatter.description ? frontmatter.description : excerpt}
        image={frontmatter.featuredImage ? getSrc(frontmatter.featuredImage) : null}
      />




<div className="post-container">


{/* show feature */}
{showFeature ? (   
<section id="feature" order="1" name="feature" className="print scroll-area" style={{  height:'100vh', maxHeight:'', margin:'0 auto 0 auto', padding:'0 0 0 0', position:'relative',

 alignContent:'center', display:'flex', textAlign:'left', justifyContent:'start', verticalAlign:'center',
  color:'#fff',
  fontSize:'clamp(1rem, 1.8vw, 3.2rem)',
  // background:'rgba(0,0,0,0.50)',
  // backdropFilter:'blur(8px)',
  // borderRadius:'10px',
  textShadow:'0 2px 7px #000',
  // maxWidth:'95%',
  // border:'1px solid #333',
  background:'#000'

}}>
  <article>

  <div className="" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', color:'#999'}}  >
{FrontImage ? (

<GatsbyImage
image={FrontImage}
alt={frontmatter.title + " - Featured image"}
className="featuredimage"
placeholder="blurred"
loading="eager"
style={{height:'auto', width:'100vw', maxHeight:'', position:'absolute', zIndex:'0', top:'0', left:'0', right:'0', border:'0px solid #888 !important', objectFit:'contain', margin:'0 2%'}}
/>




          ) : (

            <StaticImage src="../../static/assets/default-og-image.webp" alt="Default Image" style={{height:'auto', maxHeight:'100vh', position:'absolute', zIndex:'0', top:'0',border:'0px solid !important', objectFit:'contain', margin:'0 auto'}} />
  
          )}

{YouTube ? (
            <Iframer />
       
          ) : (
            ""
          )}
      </div>
      
  </article>
</section>
) : (
  ""
)}
{/* end show feature */}


        
{showProfile ? (
  <section className="scroll-area panel" id="info" order="2" name="info" style={{ display:'', height:'100%', minHeight:'100vh', position:'relative', zIndex:'0', overflow:'visible', margin:'0 auto 0 auto', padding:'0 0 0 0', background:'var(--theme-ui-colors-background)', color:'var(--theme-ui-colors-text)', maxWidth:'95%', borderRadius:'8px', }}>
  <article style={{ margin:'0 0 0 0'}}>

  {/* <div className="" style={{maxHeight:'100vh', width:'100vw', height:'', overflow:'visible',position:'absolute', top:'', zIndex:'-1',}}>
{UnderlayImage ? (
            <GatsbyImage
            image={UnderlayImage}
            alt={frontmatter.title + " - image"}
            className="mcboaty print"
            placeholder="blurred" loading="eager"
              style={{height:'auto', width:'100vw', maxHeight:'100vh',  objectFit:'cover', overflow:'visible', border:'0px solid red !important'}}
          />
          ) : (
            ""
          )}
</div> */}

<div id="profiletop" className="flexbutt" style={{display:'', gap:'10px', justifyContent:'center', alignItems:"center", margin:'0 0',
  padding:'0 2% 0 2%', position:'relative', color: ''}}>



{UnderlayImage ? (
  <div className="nameblock flexcheek" style={{position:'sticky', top:'0', marginTop: '', width:'100%', padding: '1rem 2rem 0 2rem', maxHeight: '', fontSize: 'clamp(1rem, 1.4vw, 3.2rem)', textShadow: '0 2px 3px var(--theme-ui-colors-textShadow)', color: '', backdropFilter: 'blur(12px)', borderRadius: '10px' }}>
    <CommonElements title={frontmatter.profTitle} tagline={frontmatter.tagline} description={ProfText} />
  </div>
) : (
  <div className="nameblock flexcheek" style={{position:'sticky', top:'0', marginTop: '', padding: '1rem 2rem 0 2rem', maxHeight: '', fontSize: 'clamp(1rem, 1.4vw, 3.2rem)',  borderRadius: '10px' }}>
  <CommonElements title={frontmatter.profTitle} tagline={frontmatter.tagline} description={ProfText} />
  </div>
)}



      <div className="flexcheek mob2 print" style={{position:'sticky', top:'0', minWidth:'500px', overflow:'', marginBottom:'', paddingTop:'2vh', borderRadius:'0 0 10px 10px',
      }}>
{SecondaryImage ? (
            <GatsbyImage
              image={SecondaryImage}
              alt={frontmatter.title + " - Featured image"}
              className="avatar-frame"
              style={{ maxWidth:'300px', margin:'0 auto', height:'', maxHeight:'300px', position:'relative', top:'', objectFit:'contain', backgroundSize:'contain', marginBottom:'0', border:'0'}}
            />
          ) : (
            ""
          )}
<div className="nameblock" style={{margin:'0 auto 0 auto', padding:'0 0 0 0',alignContent:'center', display:'grid', textAlign:'center', justifyContent:'center', verticalAlign:'center',
  color:'#fff',
  paddingTop:'', 
  fontSize:'clamp(1rem, 1.4vw, 3.2rem)',
  background:'rgba(0,0,0,0.50)',
  backdropFilter:'blur(8px)',
  border:'10px double var(--theme-ui-colors-buttonHoverBg)', borderRadius:'12px',
  textShadow:'0 2px 0px #000',
  maxWidth:'70%'
}}>
  {/* <span style={{margin:'10px auto', fontSize:'160%'}}>{companyname}</span> */}
    <span style={{margin:'10px auto', fontSize:'160%'}}>Become a PIRATE!</span>
  
  {frontmatter.addressText ? (
    frontmatter.addressText
  ) : (
    ""
  )}
  <br />
  {frontmatter.addressText2 ? (
    frontmatter.addressText2
  ) : (
    ""
  )}
  <br />
  <Link to={frontmatter.cta.ctaLink} className="button print" style={{ display: 'flex', justifyContent: 'center', padding:'1vh .5vw', maxWidth:'250px', }}>{frontmatter.cta.ctaText}</Link>

    {/* <AnchorLink to='/install' className="button actionJackson print" style={{ display: 'flex', justifyContent: 'center', padding:'1vh .5vw', maxWidth:'250px', color:'#fff' }}>Install Now</AnchorLink> */}
  {/* <br /> */}
  {/* <SignUp /> */}
  {/* <Link className="button" state={{modal: true}} to="/install" rel="nofollow">
Become a PIRATE!
</Link> */}

  {/* <br /> */}
  {showCover ? (
    <Link state={{modal: true}} to={frontmatter.coverletter.coverLink} className="print" style={{color:'', fontSize:'', margin:'5px auto', textAlign:'center', textDecoration:'underline', maxWidth:'600px', padding:'0 2rem'}}>{coverText}</Link>
  ) : (
    ""
  )}
  

  {showSocial ? (
    <Social />
  ) : (
    ""
  )}

  { !YouTube2 ? (
    ""
  ) : (
    <Iframer3 />
  )}

</div>


</div>
</div> 
</article>
</section>
  ) : (
    ""
  
)}




    <HomePosts isSliderVisible={isSliderVisible} />




    
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        titleDefault
        siteUrl
        description
        image
        twitterUsername
        companyname
      }
    }
    markdownRemark(id: {eq: $id}) {
      ...isDraft
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "YYYY-MM-DD-HH-MM-SS")
        slug
        title
        tags
        description
        profTitle
        profText
        tagline
        addressText
        addressText2
        spotlight
        draft
        cta{
          ctaText
          ctaLink
        }
        coverletter{
          coverText
        }
        youtube {
          youtuber
          youtuber2
          youtubeshoworiginal
          youtubersuggestion1
          youtubersuggestion2
          youtubersuggestion3
          youtubestart
          youtubeend
          youtubemute
          youtubeloop
          youtubecontrols
          customcontrols
          clicktoplay
          youtubeautostart
          liarliar
          contentinvideo
          audiostart
          audioend
          audiotitle
        }
        mediawarnings {
          viewerwarning
          marate
          marating1
          marating2
          marating3
          marating4
          maratingtx1
          maratingtx2
          maratingtx3
          maratingtx4
        }
        comments
        shareable
        bumpertext
        nftdrop
        svgzindex
        scrollable
        featuredImage {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        svgImage {
          publicURL
        }
        secondaryImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        underlayImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
}
`;

export default HomePage;

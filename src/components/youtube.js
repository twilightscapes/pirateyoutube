import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import { Link } from "gatsby"
import { RiCloseCircleFill } from "react-icons/ri"
import PirateLogo from "../img/logo.svg"

const YouTubePlayer = () => {
  const [youtubelink, setYoutubelink] = useState("");
  const [isActive, setIsActive] = useState(false);
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      };
    }
  }, [inputElement]);

  useEffect(() => {
    const fillFormFromClipboard = () => {
      navigator.clipboard.readText().then((clipboardText) => {
        setYoutubelink(clipboardText);
        handleShow();
      });
    };

    fillFormFromClipboard();
  }, []);

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

  const finalUrl = youtubelink;

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const resizeMobile = () => {
    setIsMenuOpen(false);
    setIsMobile(true);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "none";
      el.style.overflow = "hidden";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

  const resizeDesk = () => {
    setIsMenuOpen(true);
    setIsMobile(false);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "flex";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsMenuOpen = window.localStorage.getItem("isMenuOpen");
      if (storedIsMenuOpen) {
        setIsMenuOpen(storedIsMenuOpen === "true");
      } else {
        setIsMenuOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("isMenuOpen", isMenuOpen);
    }
  }, [isMenuOpen]);

  const MenuIcon = isMenuOpen ? RiCloseCircleFill : PirateLogo;

  return (
    <>
      <div className="pagemenu panel" style={{
        position: "fixed",
        top: "1vw",
        zIndex: "1",
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
        borderRadius: "var(--theme-ui-colors-borderRadius)",
        textShadow: "0 1px 1px rgba(0, 0, 0, .7)",
        verticalAlign: "center",
      }}>
        <div className="menusnapp" style={{
          gap: "0",
          padding: "2vh 2vw",
          alignItems: "center",
          display: isMenuOpen ? "block" : "none",
        }}>
          {/* your menu content */}
        </div>
        <button
          onClick={isMenuOpen ? resizeMobile : resizeDesk}
          aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
          style={{ cursor: "pointer", padding: "8px", color: "#999", fontSize: 'clamp(2rem, 3vw, 3rem)' }}
        >
          <MenuIcon style={{maxHeight:'45px'}} />
        </button>
      </div>

      <div className='player-wrapper'>
        {youtubelink && (
          <ReactPlayer
            className='react-player'
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
            style={{position:'relative', top:'0', zIndex:'0', height:'93vh', overflow:'hidden'}}
          />
        )}
      </div>

      <div className="form-container controller" style={{marginTop:'0', height:'7vh', padding:'0 2%', width:'100vw', background:'var(--theme-ui-colors-headerColor)'}}>
        <div style={{ maxWidth:'800px', margin:'0 auto'}}>
          <form className="youtubeform frontdrop" onSubmit={handleSubmit}>
            {/* your form content */}
          </form>
        </div>
      </div>
    </>
  );
};

export default YouTubePlayer;

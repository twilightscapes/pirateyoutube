import React, { useState, useEffect } from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
import {Link} from "gatsby"
import { RiQuestionLine, RiCloseCircleFill } from "react-icons/ri"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"

// import useNetlifyIdentity from '../components/useNetlifyIdentity';


function Pirate() {

  // const [loggedIn] = useState(false);
  
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  /* eslint-disable-next-line no-unused-vars */
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
        setIsMenuOpen(true); // set default value to true if no value found in local storage
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("isMenuOpen", isMenuOpen);
    }
  }, [isMenuOpen]);
  

  const MenuIcon = isMenuOpen ? RiCloseCircleFill : RiQuestionLine;

  return (


<Layout>
<Helmet>

  
        <body id="body" className="piratepage scroll" />
      </Helmet>




{/* {loggedIn ? (
  <div style={{position:'relative', left:'', top:'222px', cursor:'pointer'}}>LOGGED IN</div>
) : (
  <div style={{position:'relative', left:'', top:'222px', cursor:'pointer'}}>LOGGED OUT</div>
  )} */}


<div className="scroll-container1" style={{display:'flex', justifyContent:'start', maxWidth:'', height:'calc(100vh - 60px)', margin:'0 auto 0 auto', position:'relative', left:'0', right:'0', top:'0'}}>
<iframe title="Pirate Frame" id="youtube2" className="blog-video1" width="100%" height="400" src="/admin/" frameBorder="0" playsInline  style={{position:'absolute', top:'0', left:'0', right:'0', zIndex:'0', width:'100%', height:'calc(100vh - 70px)', minHeight:'', border:'0px solid yellow', borderRadius:'0', padding:'0 0 0 0' }} />
</div>



<div
          className="pagemenu panel"
          style={{
            position: "fixed",
            bottom: "20px",
            zIndex: "4",
            left: "1vw",
            right: "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            maxWidth: "80vw",
            margin: "0 auto",
            gap: "5vw",
            background: "rgba(0, 0, 0, .5)",
            padding: "",
            border: "1px solid #666",
            borderRadius: "",
            textShadow: "0 1px 1px rgba(0, 0, 0, .7)",
            // fontSize: "clamp(2rem, 3vw, 3rem)",
            verticalAlign: "center",
          }}
        >
          <div
            className="menusnapp"
            style={{
              gap: "0",
              padding: "2vh 4vw",
              alignItems: "center",
              display: isMenuOpen ? "block" : "none",
            }}
          >

<div className="flexbutt" style={{width:'100%', gap:'2vw'}}>

<div className="contact-form flexcheek" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', minWidth:'30vw' }}>
Help Section Coming Soon!
</div>
<div className="flexcheek" style={{ minWidth: '', maxHeight: '40vh', overflow: 'scroll', border:'1px solid #333', padding:'100px 3% 0 3%', borderRadius:'8px', textAlign:'center', position:'relative' }}>
<h3>Help Section:</h3>

<ul>
  <li><Link state={{modal: true}} to="/location">Location</Link></li>
</ul>




</div>


</div>   

          </div>
          <button
            onClick={isMenuOpen ? resizeMobile : resizeDesk}
            aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
            style={{ cursor: "pointer", padding: "8px", color: "#999", fontSize: 'clamp(2rem, 3vw, 3rem)' }}
          >
            <MenuIcon />
          </button>
        </div>

</Layout>




  );
}

export default Pirate;



import React, { useState, useEffect, useCallback } from 'react';
import Seo from "./seo"
import { Link } from 'gatsby-plugin-modal-routing-4'
import "../assets/scss/reset.scss"
import "../assets/scss/global.scss"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import { Helmet } from "react-helmet"
import Theme from "./theme"
import SearchIcon from "../../src/img/search"
import useSiteMetadata from "../hooks/SiteMetadata"
import { RiArrowUpFill } from "react-icons/ri"
import GoBack from "../components/goBack"
import { BiLeftArrow, BiHome } from "react-icons/bi"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-4'
import Menu from "../components/menu"
import userStyles from "../../static/data/userStyles.json"
import SignUp from "../components/newssign"
import BlueCheck from './bluecheck';


// import useNetlifyIdentity from '../components/useNetlifyIdentity';
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { PiHandSwipeRightFill } from "react-icons/pi";
import { window } from "browser-monads"
const Layout = ({ children }) => {

// const [loggedIn, setLoggedIn] = useState(false);
//   useNetlifyIdentity(setLoggedIn);
const { companyname } = useSiteMetadata()
const { iconimage } = useSiteMetadata()
const { image } = useSiteMetadata()
const { showNav } = useSiteMetadata()
const { showNav2 } = useSiteMetadata()
const { showSearch } = useSiteMetadata()
const { showPopup } = useSiteMetadata()
const { font1 } = useSiteMetadata()

const { showSwipe } = useSiteMetadata()
const [archiveView, setArchiveView] = useState('');

const applyArchiveView = useCallback(() => {
  const elements = document.querySelectorAll(".contentpanel");
  elements.forEach((el) => {
    if (archiveView === "grid") {
      el.classList.remove("horizontal-scroll", "panels");
      el.classList.add("grid-container");
      // document.body.classList.add("scrollable");
      // document.querySelector('#showPosts').style.height = 'auto';
      window.scrollTo(0, 0);
    } 
    
    // if ( document.querySelector('body').classList.contains("homepage")) {
    //   el.classList.remove("horizontal-scroll", "panels");
    //   el.classList.add("grid-container");
    // }
    
    else if (archiveView === "swipe") {
      el.classList.remove("grid-container");
      el.classList.add("horizontal-scroll", "panels");
      // document.body.classList.remove("scrollable");
      document.querySelector('.contentpanel').style.transition = 'all .5s ease-in-out';
      // document.querySelector('#showPosts').style.height = '600px';
      // window.scrollTo(0, 0);
    }




  });
  localStorage.setItem("archiveView", archiveView);
}, [archiveView]);




useEffect(() => {
  sessionStorage.setItem("currentScrollPos", window.pageYOffset)
  let prevScrollpos = window.pageYOffset;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos && prevScrollpos - currentScrollPos > 75) {
      // document.querySelector('.header').style.transform = 'translateY(0)';
      if (showNav2) {
        document.querySelector('#menuicon').style.transform = 'translateX(0)';
      }
      document.querySelector('.upbar').style.transform = 'translateY(140px)';
      // document.body.classList.remove('scroll');
      // document.body.classList.add('scroll');
    } else if (prevScrollpos < currentScrollPos && currentScrollPos - prevScrollpos > 75) {
      // document.querySelector('.header').style.transform = 'translateY(-100px)';
      if (showNav2) {
        document.querySelector('#menuicon').style.transform = 'translateX(200px)';
      }
      document.querySelector('.upbar').style.transform = 'translateY(-100px)';
      // document.body.classList.add('scroll');
    }
    prevScrollpos = currentScrollPos;
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  }
}, [showNav2]);






useEffect(() => {
  if (showSwipe) {
    // Retrieve the selected option from local storage or default to 'grid' or 'swipe'
    const storedArchiveView = localStorage.getItem("archiveView");
    setArchiveView(
      storedArchiveView || (showSwipe ? "grid" : "swipe")
    );
  }
}, [showSwipe]);

useEffect(() => {
  // Apply the selected option on page load
  applyArchiveView();
}, [applyArchiveView]);

const toggleArchiveView = () => {
  const newArchiveView = archiveView === "grid" ? "swipe" : "grid";
  setArchiveView(newArchiveView);
  applyArchiveView();
};



















  



const fontUrl = "https://fonts.googleapis.com/css?family=" + font1.replace(/\s+/g, '+') + "&display=swap";


  return (
<>
<Helmet>
  <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  {font1 ? (
    <link id="yyy" rel="stylesheet" href={fontUrl} crossOrigin="anonymous" referrerPolicy="no-referrer-when-downgrade" />
  ) : null}
  <style>{`
    #menu,.font,.full-width-image:after,.h1,.h2,.h3,.h4,.header .menu-icon:before,.horizontal-scroll:before,.intro:after,.intro:before,.scrolldown,h1,h2,h3,h4,input.special{font-family:${font1}, sans-serif}
    ${userStyles.userStyles}
  `}</style>
</Helmet>

<Seo />


<div id="top" name="pagetop"></div>


<ModalRoutingContext.Consumer>
  {({ modal, closeTo }) => (
    <>
      {modal && closeTo ? (
        <div style={{ display: '', position: 'fixed', top: '50px', right: '3%', padding: '0px', fontSize: '', opacity: '1 !important', zIndex: '10', }}>
          <Link state={{ noScroll: true }} to={closeTo} style={{ fontSize: '', textDecoration: 'none', lineHeight: '', display: 'flex', flexDirection: 'column', color: '#fff', cursor: 'pointer' }}>
            <button className="button" style={{ display: 'flex', justifyContent: 'center' }}>
              <span className="icon -left" style={{ paddingRight: '' }}><BiLeftArrow /></span>{" "}Go Back
            </button>
          </Link>
        </div>
      ) : (
        ''
      )}
    </>
  )}
</ModalRoutingContext.Consumer>

{/* <div className="upbar button" style={{position:'fixed', top:'', right:'5vw', zIndex:'5', justifyContent:'center', width:'auto', maxWidth:'80vw', margin:'0 auto', gap:'5vw', padding:'0 4px', borderRadius:'', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', fontSize:'', verticalAlign:'center', transform: '' }}>

<div className="uparrow" style={{display:'flex', flexDirection:'column', gap:'0', padding:'', alignItems:'center', textAlign:'center'}}>
  <a href="#top" onClick={(e) => {
  e.preventDefault();
  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
}} aria-label="Link to Top" style={{cursor:'pointer', height:'', fontSize:''}}>
  <RiArrowUpFill className="" style={{cursor:'pointer', color:'#ddd', fontSize:'1rem'}} />
</a>
</div>
</div> */}



<div id="gobacker" style={{position:'fixed', bottom:'0', right:'0', zIndex:'5', display:'flex', flexDirection:'column', alignItems:'center', gap:'', border:'0px solid yellow', justifyContent:'flex-end', paddingBottom:'12vh',  }}>
  
  <GoBack />

<div style={{display:'flex', alignItems:'center', gap:'10px', paddingLeft:'1rem'}}>
<div className="homebutt button" style={{display:'flex', flexDirection:'column', gap:'0', padding:'0', alignItems:'', textAlign:'center', borderRadius:'3px', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', margin:'0' }}>
  <Link to="/" aria-label="Link to Top" style={{cursor:'pointer', display:'block', height:'', fontSize:''}}>
  <BiHome className="" style={{cursor:'pointer', backgroundColor:'rgba(0,0,0,.9)', color:'#ddd', fontSize:'32px', padding:'2',}} />
  </Link>
</div>

<a href="#top" onClick={(e) => {
  e.preventDefault();
  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
}} aria-label="Link to Top" style={{cursor:'pointer', display:'block', height:'', fontSize:''}}>
<div className="uparrow1 button" style={{display:'flex', flexDirection:'column', gap:'0', padding:'0', alignItems:'center', textAlign:'center', borderRadius:'3px', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', margin:'0 1rem' }}>
  <RiArrowUpFill className="" style={{cursor:'pointer', backgroundColor:'rgba(0,0,0,.9)', color:'#ddd', padding:'2px', fontSize:'32px'}} />
</div>
</a>
</div>
</div>


{showNav ? (

<header className="header" style={{display:'block', height:'51px',}}>

<div id="menu" className="menu print panel1 header" style={{position:'fixed', width:'100vw', top:'0', zIndex:'10', maxHeight:'', overFlow:'', boxShadow:'0 0 2px rgba(0,0,0,.7)', padding:'0 2%', alignItems:'start', borderRadius:'0', display:'flex', justifyContent:'space-around', gap:'10px', color:'#fff',  borderBottom:'1px solid #222',}}>

<Link to="/" className="cornerlogo" name="homereturn" style={{position:'', display:'flex', marginLeft:'5px', alignItems:'center', justifyContent:'center', maxWidth:'', height:'60px', border:'0px solid transparent'}}  aria-label="Link to Top" title="Back to Top">
{iconimage ? (
<img className="cornerlogo" style={{position:'relative', top:'', left:'4%', border:'0px solid white', padding:'0', maxHeight:'60px'}} src={iconimage} alt={companyname} width="111" height="60" />
) : (
<div style={{fontWeight:'bold', display:'grid', justifyContent:'center', alignItems:'center', height:'60px', fontSize:'150%' }}>{companyname}</div>
)}
</Link>
                        

<div id="bluecheck" style={{position:'absolute', left:'1%', top:'22px', cursor:'pointer'}}><BlueCheck /></div>


<ul className="topmenu" style={{ fontSize:'clamp(.6rem, 1.6vw, 1.8rem)',  textAlign:'center',maxHeight:'', display:'flex', justifyContent:'space-between', gap:'4vw',  alignItems:'center', margin:'0 auto 0 auto', padding:'1.5vh 2% 0 2%', border:'0px solid white',}}>
<Menu />
</ul>

<div id="missioncontrol" className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'3vw', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>

{showSearch ? (
<div className="searchIcon">
   <Link aria-label="Search UrbanFetish" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center', borderBottom:'none'}}>
    <SearchIcon style={{height:'30px'}} />
    <span className="themetext">search</span>
   </Link>
        </div>
      ) : (
        ""
      )}


  <div>
      <Theme  style={{}} />
        </div>

  
  {showSwipe ? (
        <div>
            <button
                aria-label="Grid/Swipe View"
                onClick={toggleArchiveView}
                className="swipescroll"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0px",
                    textAlign: "center",
                    width: "100%"
                }}
            >
                {archiveView === "grid" ? (
        <div className="themer"><PiHandSwipeRightFill style={{width:'36px', height:'30px'}} /></div>
                ) : (
        <div className="themer"><BsFillGrid3X2GapFill style={{width:'36px', height:'30px'}} /></div>
                )}
                <span className="themetext" style={{ fontSize: '' }}>
                    {archiveView === "grid" ? "swipe" : "scroll"}
                </span>
            </button>
        </div>
 ) : (
  ""
)}


</div>
</div>
</header>

) : (
  ""
)}






{showNav2 ? (

<header>

<input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
  <label htmlFor="openSidebarMenu" className="backdrop1" ></label>

<label id="menuicon" htmlFor="openSidebarMenu" className="sidebarIconToggle bug">
<div style={{textAlign:'center', opacity:'1', textShadow:'2px 2px 10px 2px #000', maxWidth:'500px', color:'#fff', fontWeight:'bold', border:'0px solid blue'}}>
{iconimage ? (
      <img className="" src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', maxWidth:'120px', border:'none'}} />
                ) : (
      <div style={{fontWeight:'bold', fontSize:'clamp(1.3rem, 2vw, 1rem)'}}>{companyname}</div>
                )}
</div>
  </label>

  

   <div id="sidebarMenu" style={{minWidth:'', width:'',}}>

<ul className="sidebarMenuInner post-card panel" style={{maxWidth:'260px', position:'absolute', right:'0', display:'', justifyContent:''}}>

    <li className="grad logo" style={{position:'relative', maxHeight:'100px', width:'auto', display:'flex', justifyContent:'center'}}>
            <AnchorLink className="sidelogo" to="/" name="homereturn" style={{position:'', display:'block', maxWidth:'150px', height:'60px', border:'0px solid'}}  aria-label="Link to Top" title="Back to Top">
            {iconimage ? (
      <img src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold', fontSize:'clamp(1.3rem, 2vw, 1rem)'}}>{companyname}</div>
                )}
            </AnchorLink>
    </li>
      

       <Menu />
                  

<li>
<ul className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>




{showSearch ? (
<li className="searchIcon">
   <Link aria-label="Search UrbanFetish" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{width:'33px', height:'30px'}} />
    <span className="themetext">search</span>
   </Link>
        </li>
      ) : (
        ""
      )}


  <li>
      <Theme  style={{}} />
        </li>

  
<li>
            <button
                aria-label="Grid/Swipe View"
                onClick={toggleArchiveView}
                className="swipescroll"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0px",
                    textAlign: "center",
                    width: "100%"
                }}
            >
                {archiveView === "grid" ? (
        <div className="themer"><PiHandSwipeRightFill style={{width:'36px', height:'30px'}} /></div>
                ) : (
        <div className="themer"><BsFillGrid3X2GapFill style={{width:'36px', height:'30px'}} /></div>
                )}
                <span className="themetext" style={{ fontSize: '' }}>
                    {archiveView === "grid" ? "swipe" : "scroll"}
                </span>
            </button>
      </li>


</ul>
</li>

</ul>
</div>

</header>

) : (
  ""
)}














{showPopup ? (
<div className="signup popper"
  style={{
  position:'fixed',
  top:'15vh',
  left:'20vw',
  right:'20vw',
  zIndex:'10',
  margin:'70px auto 0 auto',
  padding:' 0',
  maxWidth:'500px',
  borderRadius:'12px',
  // display:'grid',
  // placeSelf:'center',
  }}>
<SignUp />
  </div>

      ) : (
        ""
      )}




<div style={{maxWidth:'', position:'relative'}}>
{children}
</div>
      


 

{image ? (
<img className="backimage" src={image} alt="Default Background" style={{height:'100vh', width:'100vw', position:'fixed', zIndex:'-2', top:'0', objectFit:'cover',}} width="10" height="10" />
) : (
  ""
)}

      

      
      </>

    
    );
  };
  
  export default Layout;

  
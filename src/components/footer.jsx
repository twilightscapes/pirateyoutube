import * as React from "react"
import useSiteMetadata from "../hooks/SiteMetadata"
// import GoBack from "../components/goBack"
// import Theme from "../components/theme"
import Consent from "./Consent"
// import Install from "./install-footer"
import Icons from "../../static/data/socialmedia.json"
import {
  RiFacebookBoxFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
  RiGithubFill,
  RiTelegramFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiSkypeFill,
  RiDribbbleFill,
  RiMediumFill,
  RiBehanceFill,
} from "react-icons/ri"
import { FaWordpress, FaVk } from "react-icons/fa"
import Xlogo from "../img/xcorp-logo.svg"

import { Link } from "gatsby"
// import {
//   footerStyle,
//   // links,
//   blurb,
//   // logos,
// } from "./footer.module.css"




const sIcons = Icons.socialIcons.map((icons, index) => {




  return (


    <div key={"social icons" + index}>
      {icons.icon === "facebook" ? (
        <a aria-label="Link to Facebook" title="Facebook" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiFacebookBoxFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "x-twitter" ? (
        <a aria-label="The App Formerly known as Twitter" title="The App Formerly known as Twitter" className="social" href={icons.url} rel="noreferrer" target="_blank">
        <Xlogo style={{maxWidth:'30px'}} />
      </a>
      ) : (
        ""
      )}
      {icons.icon === "linkedin" ? (
        <a aria-label="Link to LinkIn" title="LinkedIn" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiLinkedinBoxFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "youtube" ? (
        <a aria-label="Link to YouTube" title="YouTube" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiYoutubeFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "instagram" ? (
        <a aria-label="Link to Instagram" title="Instgram" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiInstagramFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "rss" ? (
        <a aria-label="Link to RSS" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiRssFill style={{maxWidth:'35px'}} />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "github" ? (
        <a aria-label="Link to GitHub" title="GitHub" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiGithubFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "telegram" ? (
        <a aria-label="Link to Telegram" title="Telegram" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiTelegramFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "pinterest" ? (
        <a aria-label="Link to Pinterest" title="Pinterest" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiPinterestFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "snapchat" ? (
        <a aria-label="Link to SnapChat" title="SnapChat" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiSnapchatFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "skype" ? (
        <a aria-label="Link to Skype" title="Skype" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiSkypeFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "wordpress" ? (
        <a aria-label="Link to WordPress" title="WordPress" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <FaWordpress />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "dribbble" ? (
        <a aria-label="Link to Dribble" title="Dribble" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiDribbbleFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "medium" ? (
        <a aria-label="Link to Medium" title="Medium" href={icons.url} rel="noreferrer" target="_blank">
          <RiMediumFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "behance" ? (
        <a aria-label="Link to Behance" title="Behance" href={icons.url} rel="noreferrer" target="_blank">
          <RiBehanceFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "vk" ? (
        <a aria-label="Link to VK" title="VK" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <FaVk />
        </a>
      ) : (
        ""
      )}
    </div>

  )
})









export default function Footer() {
  const { siteUrl } = useSiteMetadata();

  const speedIt = "https://googlechrome.github.io/lighthouse/viewer/?psiurl=" + siteUrl + "%2F&amp;strategy=mobile&amp;category=performance&amp;category=accessibility&amp;category=best-practices&amp;category=seo&amp;category=pwa&amp;utm_source=lh-chrome-ext"



  const { language } = useSiteMetadata();

  const { dicSocial, dicDisclaimer, dicPrivacy, dicTerms, dicCopyright, dicContact, dicPirate, dicSiteReport } = language;


  const { companyname } = useSiteMetadata()
  const { showfooter } = useSiteMetadata()
  const { showConsent } = useSiteMetadata()
  const { showSocial } = useSiteMetadata();
  const { showBranding } = useSiteMetadata();
  const { showLegal } = useSiteMetadata();
  const { showContact } = useSiteMetadata();
  


  return (


    showfooter ? (
  



      <footer className="" style={{display:'flex', flexDirection:'column', padding:'0', marginTop:'0', width:'100vw',textAlign:'center', background:'var(--theme-ui-colors-headerColor)'}}>

{showConsent ? (
    <Consent />
  ) : (
""
    )}


    


    {/* <Install /> */}
    

    

    { showContact ? (
      <Link id="footercontact" state={{modal: true}} to="/contact/" className="button fire font" style={{margin:'2rem 2rem', textDecoration:'none', padding:'1vh 2rem',}}>{dicContact}</Link>
      ) : (
        ""
      )}



{ showSocial ? (
  <div className="social-icons" style={{textAlign:'center', justifyContent:'center', display:'flex', alignItems:'center', margin:'3rem 0'}}>
       <div className="socialtext" style={{fontSize:'14px',}}>{dicSocial}</div> {sIcons}
        </div>
      ) : (
""
  )}


    

  
        


        



      <nav className="footerlinks" aria-label="footer">


      { showLegal ? (
        <div style={{width:'100%', textAlign: 'center', justifyContent: 'center', fontSize: '.95rem', textDecoration:'none', display:'grid', margin:'1rem auto'}}>

<div style={{display:'flex', justifyContent:'center', gap:'4%' }}><Link state={{modal: true}} to="/disclaimer/">{dicDisclaimer}</Link> | <Link state={{modal: true}} to="/privacy/">{dicPrivacy}</Link> | <Link state={{modal: true}} to="/terms/">{dicTerms}</Link></div>
  <br />
  <br />
{dicCopyright} &copy;
{(new Date().getFullYear())} 
&nbsp;
 {companyname}
</div>
      ) : (
""
  )}





{ showBranding ? (
  <div style={{textAlign: 'center', margin: '0 0 2rem 0', justifyContent: 'center', fontSize: '.75rem', position:'relative', right:'', top:'10px'}}>
<a href="https://pirateweb.org" rel="noreferrer">{dicPirate}</a> &nbsp; | &nbsp; <a href={speedIt} rel="noreferrer">{dicSiteReport}</a>
</div>
      ) : (
""
  )}





<br />
<br />
<br />




      </nav>
   
    </footer>

    ) : (
      ""
    )



    
  )
}


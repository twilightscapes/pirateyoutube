
import * as React from "react"
import { Link } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"
import useSiteMetadata from "../hooks/SiteMetadata";


export function NewsletterPage() {

  const { showModals, language } = useSiteMetadata();



const { dicPrivacy, dicSignUpText, dicSignUpButton } = language;

return (

<div className="signup" style={{}}>
<form  style={{width:'100%', minWidth:'400px', margin:'0 auto 0 auto', display:'flex', flexDirection:'column', justifyContent:'center', background: 'var(--theme-ui-colors-headerColor)',
  backdropFilter: 'blur(44px)', borderRadius:'var(--theme-ui-colors-borderRadius)', textAlign:'center', alignSelf:'center', overflow:'hidden', color:'', border:'0px solid red'}}
          className="contact-form"
          action="/signedup/"
          name="ts-news"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="news" />



            
              {/* <div className="txtshadow" style={{fontSize:'clamp(1.4rem, 1.5vw, 1.5rem)', textAlign:'center', marginTop:'10px'}}><strong>The Fleet Launches Soon!</strong></div>
              <br /> */}
              <div className="txtshadow" style={{fontSize:'95%', marginTop:'1rem'}}>{dicSignUpText} </div>

             <div className="signbox" style={{display:'flex', flexDirection:'column',gap:'10px'}}>
             
             
{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
<label style={{ color: '#fff' }} htmlFor="email">
  <input
    name="email"
    type="email"
    id="email"
    required={true}
    placeholder="your@email.com"
    autoComplete="email"
  />
</label>

                      
            


  

            

            <button
              className="button fire"
              type="submit"
              style={{marginTop:'-8px', whiteSpace:'nowrap', color:''
            }}
            >
              {dicSignUpButton}&nbsp;
              <span className="icon -right">
                <RiSendPlane2Line />
              </span>
            </button>


            </div>


            <div style={{padding: '0px 3%', margin:'5px 0 10px 0', textAlign: 'center', color:'', fontSize:'70%'}}>
            <Link state={showModals ? { modal: true } : {}} to="/privacy/" className="" style={{textAlign: 'center', padding: '15px',  textDecoration: 'underline', border:'0px solid yellow'}}>{dicPrivacy}</Link>
           
            </div>
</form>
</div>

)
  
}

export default NewsletterPage;


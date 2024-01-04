
import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"
import useSiteMetadata from "../hooks/SiteMetadata";


export function NewsletterPage() {

  const { showModals, language } = useSiteMetadata();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const encode = data => {
    console.log(data);
    return Object.keys(data)
      .map(key => {
        if (key === "file") {
          return encodeURIComponent(key) + "=" + encodeURIComponent(data[key][0].name);
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      })
      .join("&");
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (key === "file") {
        data[key] = [value];
      } else {
        data[key] = value;
      }
    });


      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("contact"),
          ...data,
        }),
      })
        .then(() => setSubmitted(true))
        .catch(error => alert(error));
    
  };

const { dicPrivacy, dicSignUpText, dicSignUpButton } = language;

return (





<div className="signup" style={{}}>
<form
  className={`contact-form flexcheek1 ${submitted ? "submitted" : ""}`}
  action="/install2"
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  encType="multipart/form-data"
  onSubmit={handleSubmit}
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    opacity: isSubmitting ? 0.5 : 1,
  }}
  
>




  {submitted ? (
    <div className="thank-you-message" style={{fontSize:'200%', height:'60vh', textAlign:'center'}}>
      Thank you - we'll be in touch!
    </div>
  ) : (
    <>
      <input type="hidden" name="form-name" value="contact" />


    {/* <p>
      <label htmlFor="name" aria-label="Your Name">
        <input type="text" id="name" name="name" placeholder="Your name" required />
      </label>
    </p> */}
  

      <p>
        <label htmlFor="email" aria-label="Your Email">
          <input id="email" type="email" name="email" placeholder="your@email.com" required />
        </label>
      </p>


    {/* <p>
      <label htmlFor="phone" aria-label="Your Phone">
        <input type="tel" id="phone" name="phone" placeholder="Your phone number" />
      </label>
    </p> */}



      {/* <p>
        <label htmlFor="message" aria-label="Your Message">
          <textarea id="message" name="message" placeholder="Your Bio" required></textarea>
        </label>
      </p> */}




   {/* <label htmlFor="file"  aria-label="Upload your file" style={{padding: '0', color: 'inherit', textShadow:'1px 1px 0 #555', display:'flex', flexDirection:'column', width:'100%', fontSize:'90%', gap:'15px', justifyContent:'center', alignItems:'center'}}>
  Upload file
        <input className="file-input hidden" type="file" id="file" name="file" />
      </label> */}


      <p
        className="text-align-right1"
        style={{ margin: "0 auto", color: "" }}
      >
       

        <button
            className="button"
            type="submit"
            disabled={isSubmitting}
            style={{width:'90%',}}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>


      </p>
    </>
  )}
</form>

</div>

)
  
}

export default NewsletterPage;


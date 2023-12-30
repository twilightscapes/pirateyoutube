import React from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";













const Location = () => {
      return (

 <Layout className="thanks-page">
 <Seo title={`Terms of Use`} />

<section className="outer section section--gradient" >
      <div className="container" style={{padding: '30px 0'}}>
        
      {/* <div className="mobile"><GoBack /></div> */}

{/* <h1 className="title" style={{fontSize:'50px'}}>Virtual Tour</h1> */}
    

<div style={{width:'90%', height:'100px', margin:'0 auto', textAlign:'center',}}>
{/* 
<p><strong>Hytron Manufacturing, Inc.</strong><br />
15582 Chemical Lane<br />
Huntington Beach, CA 92649<br />
Phone: <a className="call-button btn" href="tel:7149036701">(714) 903-6701</a><br />
Fax: (714) 903-4381</p> */}
</div>

<div id="tour" className="virtualtour">
<iframe title="location map" className="virtualtour" width="800" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps?t=m&amp;ll=33.744397,-118.027239&amp;z=18&amp;iwloc=A&amp;output=embed" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{maxWidth:'100%', margin:'0 auto', border:'10px solid #333', borderRadius:'12px'}}></iframe>

{/* <iframe title="location map" className="virtualtour" width="800" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d440411.6731031403!2d-89.06844955!3d30.415792999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1703929056320!5m2!1sen!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{maxWidth:'100%', margin:'0 auto', border:'10px solid #333', borderRadius:'12px'}}></iframe> */}

{/* <iframe title="location map" className="virtualtour" width="800" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d440411.6731031403!2d-89.06844955!3d30.415792999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1703929056320!5m2!1sen!2sus" width="600" height="450" style={{maxWidth:'100%', margin:'0 auto', border:'10px solid #333', borderRadius:'12px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

      </div>




</div>



   

    <div className="spacer33"></div> 
    </section>
    
    
    </Layout>
  );
};

export default Location;
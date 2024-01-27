import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby"
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";
import HomePosts from "../components/HomePosts";
import Seo from "../components/seo";
import { getSrc } from "gatsby-plugin-image";
import useSiteMetadata from "../hooks/SiteMetadata";
import { GatsbyImage } from "gatsby-plugin-image"
import Social from "../components/social"
const HomePage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, excerpt } = markdownRemark;

  const FrontImage = frontmatter.featuredImage
  ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
  : ""

  // const { postcount } = useSiteMetadata()
  // const Postcount = postcount

  const SecondaryImage = frontmatter.secondaryImage
  ? frontmatter.secondaryImage.childImageSharp.gatsbyImageData
  : ""

  const UnderlayImage = frontmatter.underlayImage
  ? frontmatter.underlayImage.childImageSharp.gatsbyImageData
  : null;
  
  const ProfText = frontmatter.profText
  const { showCover } = useSiteMetadata()
      const { showSocial } = useSiteMetadata()
      const SkillsText = frontmatter.skillsText
      const coverText = frontmatter.coverletter.coverText
      const YouTube2 = frontmatter.youtube.youtuber2

  const CommonElements = ({ title, tagline, description }) => (
    <div className=" mob print" style={{ position:'sticky', top:'0', fontSize: 'clamp(1rem, 1.5vw, 3.2rem)' }}>
      <h1 className="title1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>{title}</h1>
      <h2 className="tagline1" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 3.2rem)' }}>
        {tagline}
      </h2>
      <div style={{ fontSize: 'clamp(1.2rem, 1.8vw, 3.2rem)' }} className="description" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );




  const { proOptions  } = useSiteMetadata();
  const { showDefault } = proOptions
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
        <HomePosts isSliderVisible={isSliderVisible} />
        <article style={{ margin:'0 0 15vh 0'}}>

<div className="" style={{maxHeight:'100vh', width:'100vw', height:'', overflow:'visible',position:'absolute', top:'', zIndex:'-1',}}>
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
</div>

<div id="profiletop" className="flexbutt" style={{display:'', gap:'10px', justifyContent:'center', alignItems:"center", margin:'0 0',
padding:'0 2% 0 2%', position:'relative', color: ''}}>



{UnderlayImage ? (
<div className="nameblock flexcheek" style={{position:'sticky', top:'0', marginTop: '', width:'100%', padding: '1rem 2rem 0 2rem', maxHeight: '', fontSize: 'clamp(1rem, 1.4vw, 3.2rem)', textShadow: '0 2px 3px #000', color: '', background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(12px)', borderRadius: '10px' }}>
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
{/* <Link to={frontmatter.cta.ctaLink} className="button print" style={{ display: 'flex', justifyContent: 'center', padding:'1vh .5vw', maxWidth:'250px', }}>{frontmatter.cta.ctaText}</Link> */}
It's Completely FREE!
  {/* <AnchorLink to='/install' className="button actionJackson print" style={{ display: 'flex', justifyContent: 'center', padding:'1vh .5vw', maxWidth:'250px', color:'#fff' }}>Install Now</AnchorLink> */}
<br />
{/* <SignUp /> */}
<Link className="button" state={{modal: true}} to="/contact" rel="nofollow">
Become a PIRATE!
</Link>

<br />
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

{/* { !YouTube2 ? (
  ""
) : (
  <Iframer3 />
)} */}

</div>


</div>
</div> 
</article>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "YYYY-MM-DD-HH-MM-SS")
        slug
        title
        description
        profTitle
        profText
        tagline
        addressText
        addressText2
        cta{
          ctaText
          ctaLink
        }
        coverletter{
          coverText
        }
        youtube{
          youtuber2
        }
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
      }
    }
  }
`;

export default HomePage;

import React, { useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"

import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import TimeAgo from 'react-timeago'
import useSiteMetadata from "../hooks/SiteMetadata"
const HomePosts = ({ data }) => {
  const { showDates } = useSiteMetadata()
  const { homecount } = useSiteMetadata()

  const [visibleItems, setVisibleItems] = useState(homecount); 



  const showMoreItems = () => {
    setVisibleItems(visibleItems + homecount);
  };
  

  
  // const tags = data.allMarkdownRemark.group
  // ? data.allMarkdownRemark.group
  //     .filter(group => group.fieldValue !== null && group.fieldValue !== "")
  //     .map(group => group.fieldValue)
  // : [];

  return (

<>
        {/* <div className="spacer2" style={{ height: "70px", border: "0px solid yellow" }}></div> */}
    



       

        <div className="contentpanel grid-container" style={{justifyContent:'center', alignItems:'center', marginTop:''}}>


          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>
   
          {data.allMarkdownRemark.edges &&
            data.allMarkdownRemark.edges
            
              .filter(({ node }) => (node.frontmatter))
              .reverse()
              .slice(0, visibleItems)
              .map(({ node }) => {
    

                return (
                  <div key={node.fields.slug} className="post-card1" style={{  alignItems: "center" }}>
      
                    <Link className="postlink" to={node.fields.slug}>

{node.frontmatter.featuredImage ? (
    <GatsbyImage
    image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
    alt={node.frontmatter.title + " - Featured image"}
    className="featured-image1"
    placeholder="blurred"
    loading="eager"
    style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }}
  />

) : (

  <StaticImage
            className="featured-image1"
            src="../../static/assets/default-og-image.webp"
            alt="Default Image"
            style={{ position: 'relative', zIndex: '' }}
          />

)}


<div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>

  {node.frontmatter.youtube.youtuber ? (

<div className="spotlight" style={{marginLeft:'10%', marginTop:'-28%', margin:'-24% 10% 0 10%'}}>

<div className="posticons" style={{flexDirection:'column', margin:'0 auto'}}>

<div style={{display:'flex', justifyContent:'space-around', gap:'2vw', color:'fff', }}>
<FaImage className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
<ImPlay className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
<AiOutlinePicLeft className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
</div>

Play Multimedia
</div>

</div>

) : (
""
)}

<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>
<h2 className="title1" style={{ }}>
        {node.frontmatter.title}
      </h2>
  </div>


</div>

</Link>
{showDates ? (
            <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
            <TimeAgo date={node.frontmatter.date}/>
          </p>
          ) : (
            ""
          )}
                  </div>
                )
              })
          }

{visibleItems === data.allMarkdownRemark.edges.length && (
  <div className="post-card1" style={{ justifyContent: "center", alignItems: "center" }}>End of Results Reached</div>
)}

{visibleItems < data.allMarkdownRemark.edges.length && (
  <div className="" style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'', height:'50vh'}}>
        <button className="button load-more" onClick={showMoreItems}>
          Load more
        </button>
        </div>
)}




        </div>

        </>
  );
};



export default HomePosts;

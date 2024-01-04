import React, { useState, useRef } from "react";
import { graphql, Link, navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/siteLayout";
import useSiteMetadata from "../hooks/SiteMetadata";
import { ImPlay } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { AiOutlinePicLeft } from "react-icons/ai";
import { StaticImage } from 'gatsby-plugin-image';
import { Helmet } from "react-helmet";
import TimeAgo from 'react-timeago';
import ReactPlayer from 'react-player/lazy';

const Category = ({ data, pageContext }) => {
  const { category } = pageContext;
  const posts = data.posts.edges;
  const categories = data.allMarkdownRemark.group.map((group) => group.fieldValue);

  const { showModals, showDates, language, showNav, showTitles } = useSiteMetadata();



const {dicPlayVideo, dicPlayMultimedia} = language;


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




  return (
    <Layout>
      <Helmet>
        <body id="body" className="category" />
      </Helmet>




      <div className="magicisland">
        <div className="cattags font">
        <select
          className=""
          style={{ background: 'var(--theme-ui-colors-siteColor)', outline: '1px solid #111', borderRadius: 'var(--theme-ui-colors-borderRadius)', padding: '2px', width:'380px', display:'block', margin:'0 1%', overflow:'hidden', height:'34px', lineHeight:'100%', color:'var(--theme-ui-colors-siteColorText)' }}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            navigate(`/category/${selectedCategory}`);
          }}
          value={category}
        >
          <option value="">Categories:</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* <div style={{ position: 'absolute', right: '10px', top: '8px', height: '100%', color: '#fff', zIndex: '-1', fontSize: '30px' }}><AiFillDownSquare /></div> */}
      </div>
</div>

<div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', paddingTop: showNav ? '6vw' : '6vw', }}>
        <div className="sliderSpacer" style={{ height: '', paddingTop: '', display: '' }}></div>

          {posts.map(({ node }, index) => {
  

            return (
              <div className="post-card1" style={{ alignItems: '', overflow: 'visible', position:'relative' }} key={index}>

<>
{node.frontmatter.youtube.showVidOnly ? (
<div style={{minWidth:'300px', minHeight: index === playingIndex ? '200px' : '200px', background: index === playingIndex ? 'rgba(0, 0, 0, 0.5)' : 'transparent', zindex:'1'}}>
                <ReactPlayer
                playing={index === playingIndex}
                ref={playerRef}
                url={node.frontmatter.youtube.youtuber}
                  allow="web-share"
                  // style={{ position: 'relative', margin: '0 auto 15px auto', zIndex: '',aspectRatio:'16/9', }}
                  width="350px"
                  height="200px"
                  className='inline'
                  playsinline
                  // className={`relative ${index === playingIndex ? 'fixed' : 'relative'}`}
                  style={{
                    position: index === playingIndex ? 'fixed' : 'relative',
                    
                    // top: index === playingIndex ? '50%' : 'auto',
                    // left: index === playingIndex ? '50%' : 'auto',
                    // transform: index === playingIndex ? 'translate(-50%, -50%)' : 'none',
                    bottom: index === playingIndex ? '10vh' : '',
                    left: index === playingIndex ? '5%' : '',
                    margin:'0 auto',
                    transition: 'all 1.3s ease-in-out',
                    // width: index === playingIndex ? '100%' : '350px',
                    // height: index === playingIndex ? '100%' : '200px',
                    border: index === playingIndex ? '1px solid var(--theme-ui-colors-siteColor)' : 'inherit',
                    boxShadow: index === playingIndex ? '2px 1px 10px 10px rgba(0, 0, 0, 0.5)' : 'inherit',
                    // width: '80vw',
                    // height:'60vh',
                    // margin: index === playingIndex ? '0' : '0 auto 15px auto',
                    zIndex: index === playingIndex ? '9999' : '1',
                    aspectRatio: '16/9',
                  }}
                  light={`https://i.ytimg.com/vi/${extractVideoId(node.frontmatter.youtube.youtuber)}/hqdefault.jpg`}
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
                    onPlay={() => handleVideoPlay(index)}
                    onPause={handleVideoPause}
                />
                </div>
              ) : (
                <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>
                  {node.frontmatter.featuredImage ? (
                    <GatsbyImage
                      image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                      alt={node.frontmatter.title + " - Featured image"}
                      className="featured-image1"
                      placeholder="blurred"
                      style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto', borderRadius:'var(--theme-ui-colors-borderRadius)' }}
                    />
                  ) : (
                    <StaticImage
                      className="featured-image1"
                      src="../../static/assets/default-og-image.webp"
                      alt="Default Image"
                      style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto', borderRadius:'var(--theme-ui-colors-borderRadius)' }}
                    />
                  )}

{node.frontmatter.youtube.youtuber ? (
                      <div className="spotlight font" style={{border:'0px solid'}}>
                        <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                            <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', }} />
                          </div>
                          {dicPlayMultimedia}
                        </div>
                      </div>
                    ) : ("")}
                </Link>
              )}

              <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>

                <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent:'center', margin: '10px auto', maxWidth: '', gap: '.4vw', maxHeight: '74px', textAlign: 'left', padding: '10px 5%', fontSize: 'clamp(.7rem,.8vh,12px)', outline:'0px solid #444', overFlow:'hidden', lineHeight:'2.4vh', borderRadius:'var(--theme-ui-colors-borderRadius)', background: showTitles ? 'var(--theme-ui-colors-headerColor)' : 'transparent', }}>
                  {showTitles ? (
                    <h2 className="title1" style={{width:'100%', }}>{node.frontmatter.title}</h2>
                  ) : (
                    ""
                  )}

                  {showDates ? (
                    <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '', padding:'0', margin:'0 0 0 20px', maxWidth: '60px', lineHeight:'100%' }}>
                      <TimeAgo date={node.frontmatter.date} />
                    </p>
                  ) : ("")}
                </div>
              </div>


        ))
</>

              </div>
            );
          })}
        </div>

    </Layout>
  );
};

export const query = graphql`
  query pageUserstoddlambertSitesbasesrctemplatescategoryJs4001253895($category: String!) {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          frontmatter {
            category
          }
        }
      }
      group(field: {frontmatter: {category: SELECT}}) {
        fieldValue
      }
    }
    posts: allMarkdownRemark(
      filter: {frontmatter: {category: {eq: $category}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            category
            youtube {
              youtuber
            }
            featuredImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;

export default Category;

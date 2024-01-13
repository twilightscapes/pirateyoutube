import React, { useState, useEffect, useRef } from "react";
import { graphql, Link, navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/siteLayout';
import useSiteMetadata from '../hooks/SiteMetadata';
import { StaticImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';
import TimeAgo from 'react-timeago';
// import { ImPlay } from 'react-icons/im';
// import { FaImage } from 'react-icons/fa';
// import { AiOutlinePicLeft } from 'react-icons/ai';
import { ImPlay } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { AiOutlinePicLeft } from "react-icons/ai";
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import ReactPlayer from 'react-player/lazy';
const BlogList = ({ data, pageContext }) => {

  const { postcount, featureOptions, proOptions, navOptions, language  } = useSiteMetadata();
  const { showModals } = proOptions
  const { showDates, showTitles } = featureOptions
  const { showNav } = navOptions
  const { dicPlayMultimedia, dicPlayVideo  } = language;
  





  
  const posts = data.allMarkdownRemark.edges;
  const { numPages, currentPage } = pageContext;




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




  useEffect(() => {
    // Add any additional initialization logic if needed
  }, []);

  // Calculate the start and end page numbers for each pagination section
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, numPages);

  return (
    <Layout>
      <Helmet>
        <body className="archivepage1 utilitypage1" />
      </Helmet>

      <div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', paddingTop: showNav ? '8vw' : '8vw', }}>
        <div className="sliderSpacer" style={{ height: '', paddingTop: '', display: '' }}></div>

        {posts.slice(0, currentPage * postcount).map(({ node }, index) => (
          <div className="post-card1" key={node.fields.slug} style={{ marginTop: '' }}>
            
            
            {(node.frontmatter.youtube?.showVidOnly && node.frontmatter.youtube.showVidOnly) ? (

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
{(node.frontmatter.youtube?.youtuber && node.frontmatter.youtube.youtuber) ? (

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

{showTitles ? (
  <>
                <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent:'center', margin: '10px auto', maxWidth: '', gap: '.4vw', maxHeight: '74px', textAlign: 'left', padding: '10px 5%', fontSize: 'clamp(.7rem,.8vh,12px)', outline:'0px solid #444', overFlow:'hidden', lineHeight:'2.4vh', borderRadius:'var(--theme-ui-colors-borderRadius)', background: showTitles ? 'var(--theme-ui-colors-headerColor)' : 'transparent', }}>
                  
                    <h2 className="title1" style={{width:'100%', }}>{node.frontmatter.title}</h2>
            

                  {showDates ? (
                    <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '', padding:'0', margin:'0 0 0 20px', maxWidth: '60px', lineHeight:'100%' }}>
                      <TimeAgo date={node.frontmatter.date} />
                    </p>
                  ) : ("")}


                </div>
                </>
) : (
  ""
)}
              </div>

          </div>


      
        ))}

        <div
          className="cattags"
          style={{
            display: 'flex',
            justifyContent: 'center',
            placeSelf: 'center',
            margin: '0 auto',
            border: '0px solid red',
            position: '',
            zIndex: '3',
            top: '',
            left: '1%',
            right: '1%',
            maxWidth: '550px',
            height: '40px',
            outline: '1px solid #333',
            borderRadius: '3px',
            padding: '0 2% 10px 2%',
            lineHeight: 'auto',
            fontFamily: 'var(--theme-ui-colors-fontFamily)',
          }}
        >
          {currentPage > 1 && (
            <button
              className="pagination"
              style={{ padding: '0 5px', marginTop: '5px' }}
              onClick={() => navigate(currentPage === 2 ? '/archive' : `/archive/${currentPage - 1}`)}
              aria-hidden="true"
            >
              <MdArrowBackIos />
            </button>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            const path = page === 1 ? '/archive' : `/archive/${page}`;
            return (
              <Link  state={showModals ? { modal: true } : {}} key={`pagination-link-${page}`} to={path} activeClassName="active" style={{ padding: '4px 20px' }}>
                {page}
              </Link>
            );
          })}

          {currentPage < numPages && (
            <button
              className="pagination"
              style={{ padding: '0 5px', marginTop: '5px' }}
              onClick={() => navigate(`/archive/${currentPage + 1}`)}
              disabled={currentPage === numPages}
              aria-hidden="true"
            >
              <MdArrowForwardIos />
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { template: { eq: "blog-post" }, draft: { ne: true } } }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            youtube {
              youtuber
            }
            slug
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

export default BlogList;

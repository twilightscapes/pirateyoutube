import React, { useEffect } from 'react';
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
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import ReactPlayer from 'react-player/lazy';
const BlogList = ({ data, pageContext }) => {

  const { postcount, featureOptions, proOptions, navOptions  } = useSiteMetadata();


  
  const { showModals } = proOptions
  const { showDates, showTitles } = featureOptions
  const { showNav } = navOptions
  
  // const { dicLoadMore, dicViewArchive, dicCategory, dicKeyword, dicSearch, dicClear, dicResults, dicPlayVideo, dicPlayMultimedia  } = language;
  
  const posts = data.allMarkdownRemark.edges;
  const { numPages, currentPage } = pageContext;

  useEffect(() => {
    // Add any additional initialization logic if needed
  }, []);

  // Calculate the start and end page numbers for each pagination section
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, numPages);

  return (
    <Layout>
      <Helmet>
        <body className="archivepage utilitypage" />
      </Helmet>

      <div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', paddingTop: showNav ? '8vw' : '8vw', }}>
        <div className="sliderSpacer" style={{ height: '', paddingTop: '', display: '' }}></div>

        {posts.slice(0, currentPage * postcount).map(({ node }, index) => (
          <div className="post-card1" key={node.fields.slug} style={{ marginTop: '' }}>
            <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>

{(node.frontmatter.youtube?.showVidOnly && node.frontmatter.youtube.showVidOnly) ? (
<ReactPlayer
                  url={node.frontmatter.youtube.youtuber}
                  allow="web-share"
                  style={{ position: 'relative', margin: '0 auto 15px auto', zIndex: '' }}
                  width="350px"
                  height="200px"
                  className='inline'
                  playsinline
                  config={{
                    file: {
                      attributes: {
                        crossOrigin: "anonymous",
                      },
                    },
                    youtube: {
                      playerVars: { showinfo: 1, autoplay: 0, controls: 1, mute: 1, loop: 1 },
                    },
                  }}
                />
              ) : (
                <div>
                  {node.frontmatter.featuredImage ? (
                    <GatsbyImage
                      image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                      alt={node.frontmatter.title + " - Featured image"}
                      className="featured-image1"
                      placeholder="blurred"
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
                </div>
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
            </Link>
            
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

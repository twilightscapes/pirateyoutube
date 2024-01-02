import React, { useState, useEffect, useRef } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { ImPlay } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { AiOutlinePicLeft } from "react-icons/ai";
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../hooks/SiteMetadata";
import TimeAgo from 'react-timeago';
import { MdArrowForwardIos } from 'react-icons/md';
import Seo from "../components/seo";
import { getSrc } from "gatsby-plugin-image";
import ReactPlayer from 'react-player/lazy';


const HomePage = ({ data }) => {
  const { showModals, showDates, homecount, postcount, magicOptions, showNav, showArchive, showTitles } = useSiteMetadata();
  const { showMagic, showMagicCat, showMagicTag, showMagicSearch } = magicOptions;

  const { markdownRemark } = data;
  const { frontmatter, excerpt } = markdownRemark;

  const allPosts = data.allMarkdownRemark.edges;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  // eslint-disable-next-line
  const [visibleItems, setVisibleItems] = useState(homecount);

  const allCategoriesSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.category));
  const allCategories = Array.from(allCategoriesSet);

  const allTagsSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.tags || []));
  const allTags = Array.from(allTagsSet);

  const filteredPosts = allPosts.filter(({ node }) => {
    const { title, tags, category: categories } = node.frontmatter;
    const titleMatch = query === "" || title.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = selectedCategory === "" || (Array.isArray(categories) && categories.includes(selectedCategory));
    const tagMatch = selectedTag === "" || (tags && Array.isArray(tags) && tags.includes(selectedTag));
    

    return titleMatch && categoryMatch && tagMatch;
  });

  const sortedTags = allTags
  .filter(tag => tag)
  .sort((a, b) => {
    const countA = allPosts.filter(({ node }) => (node.frontmatter.tags || []).includes(a)).length;
    const countB = allPosts.filter(({ node }) => (node.frontmatter.tags || []).includes(b)).length;

    return countB - countA;
  });

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
    setVisibleItems(homecount);
  }, [filteredPosts, homecount]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
    setVisibleItems(homecount);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedTag("");
    setVisibleItems(homecount);
  };

  const handleTagChange = (event) => {
    const tag = event.target.value;
    setSelectedTag(tag);
    setSelectedCategory("");
    setVisibleItems(homecount);
  };

  const [numVisibleItems, setNumVisibleItems] = useState(homecount);

  const showMoreItems = () => {
    setNumVisibleItems((prevNumVisibleItems) => prevNumVisibleItems + postcount);
  };

  function clearfield() {
    document.querySelector('#clearme').value = '';
    setQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    setVisibleItems(homecount);
  }

  return (
    <Layout>
      <Helmet>
        <body id="body" className="homepage" />
      </Helmet>

      <Seo
        title={frontmatter.title}
        description={frontmatter.description ? frontmatter.description : excerpt}
        image={getSrc(frontmatter.featuredImage)}
      />

      {showMagic ? (
        <>
          <div className="magicisland">
            <div className="cattags font">
              {showMagicCat ? (
                <>
                  {allCategories.length > 1 && (
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      style={{
                        background: 'var(--theme-ui-colors-siteColor)',
                        color: 'var(--theme-ui-colors-siteColorText)',
                        borderRadius: '3px',
                        padding: '2px',
                        minWidth: '80px',
                        maxWidth: '30%',
                        overflow: 'hidden',
                      }}
                      aria-label="Select Category"
                    >
                      <option value="">Category</option>
                      {allCategories.filter(category => category).map((category, index) => (
                        <option key={`${category}_${index}`} value={category.trim()}>
                          {category.trim()}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              ) : (
                ""
              )}

{showMagicTag ? (
  <>
    {sortedTags.length > 1 && (
      <select
        value={selectedTag}
        onChange={handleTagChange}
        style={{
          background: 'var(--theme-ui-colors-siteColor)',
          color: 'var(--theme-ui-colors-siteColorText)',
          borderRadius: '3px',
          padding: '2px',
          minWidth: '80px',
          maxWidth: '30%',
          overflow: 'hidden',
        }}
        aria-label="Select Keyword"
      >
        <option value="">Keyword</option>
        {sortedTags.map((tag, index) => (
          <option key={`${tag}_${index}`} value={tag.trim()}>
            {tag.trim()} ({allPosts.filter(({ node }) => (node.frontmatter.tags || []).includes(tag)).length})
          </option>
        ))}
      </select>
    )}
  </>
) : (
  ""
)}



              {showMagicSearch ? (
                <>
                  <label style={{ maxWidth: '' }}>
                    <input
                      id="clearme"
                      type="text"
                      placeholder="Search:"
                      onChange={handleSearch}
                      style={{
                        width: '',
                        background: 'var(--theme-ui-colors-siteColor)',
                        color: 'var(--theme-ui-colors-siteColorText)',
                        marginRight: '',
                        borderRadius: 'var(--theme-ui-colors-borderRadius)',
                        height: '',
                        padding: '6px 6px',
                        minWidth: '80px',
                        maxWidth: '80%',
                        lineHeight: '100%',
                      }}
                      aria-label="Search"
                    />
                  </label>
                </>
              ) : (
                ""
              )}

              <button
                type="reset"
                value="reset"
                className="muted"
                onClick={clearfield}
                style={{
                  position: '',
                  right: '',
                  top: '',
                  background: 'var(--theme-ui-colors-siteColor)',
                  color: 'var(--theme-ui-colors-siteColorText)',
                  textAlign: 'center',
                  fontSize: '10px',
                  height: '',
                  maxWidth: '',
                  padding: '5px',
                  borderRadius: '3px',
                  lineHeight: '100%',
                  opacity: '.8'
                }}
                aria-label="Clear"
              >
                clear
              </button>

              <div style={{ position: '', right: '', top: '', textAlign: 'center', fontSize: '9px', color: 'var(--theme-ui-colors-headerColorText)', maxWidth: '' }}>
                {filteredPosts.length} <br />
                result{filteredPosts.length !== 1 && 's'}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', paddingTop: showNav ? '6vw' : '6vw', }}>
        <div className="sliderSpacer" style={{ height: '', paddingTop: '', display: '' }}></div>

        {filteredPosts.slice(0, numVisibleItems).map(({ node }, index) => (
  

<div key={index} className="post-card1" style={{ alignItems: '', overflow: 'visible', position:'relative' }}>

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
                          Play Video
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

{node.frontmatter.youtube.youtuber ? (
                      <div className="spotlight font" style={{border:'0px solid'}}>
                        <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                            <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', }} />
                          </div>
                          Play Multimedia
                        </div>
                      </div>
                    ) : ("")}
                </Link>
              )}

              <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>

            {/* {node.frontmatter.youtube.showVidOnly ? (
                  ""
                ) : (
                  <>
                    {node.frontmatter.youtube.youtuber ? (
                      <div className="spotlight font" style={{border:'1px solid'}}>
                        <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                            <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', }} />
                          </div>
                          Play Multimedia
                        </div>
                      </div>
                    ) : ("")}
                  </>
                )} */}

                <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent:'center', margin: '10px auto', maxWidth: '', gap: '.4vw', maxHeight: '74px', textAlign: 'left', padding: '10px 5%', fontSize: 'clamp(.7rem,.8vh,12px)', outline:'0px solid #444', overFlow:'hidden', lineHeight:'2.4vh', borderRadius:'3px', background: showTitles ? 'var(--theme-ui-colors-headerColor)' : 'transparent', }}>
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

          </div>
        ))}

{numVisibleItems < filteredPosts.length && (
          <div className="loadmore" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', placeSelf: 'center', gap: '',  textAlign: 'center', zIndex:'1' }}>
            <button className="button font" onClick={showMoreItems} style={{maxWidth:''}}>
              Load more
            </button>
            {showArchive ? (
              <Link to="/archive" className="font" style={{ background: 'var(--theme-ui-colors-headerColor)', borderRadius: '', color: 'var(--theme-ui-colors-headerColorText)', display: 'flex', padding: '8px', margin: '0 auto', justifyContent:'center' }}>View Archive &nbsp;<MdArrowForwardIos style={{ marginTop: '' }} /></Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>




    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!, $homecount: Int) {
    allMarkdownRemark(
      sort: [{ frontmatter: { spotlight: ASC } }, { frontmatter: { date: DESC } }]
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: $homecount
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD-HH-MM-SS")
            youtube {
              youtuber
              showVidOnly
              youtubeautostart
              youtubecontrols
            }
            featuredImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
            category
            tags
            slug
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "YYYY-MM-DD-HH-MM-SS")
        slug
        title
        description
        featuredImage {
          publicURL
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export default HomePage;

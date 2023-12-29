import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { ImPlay } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { AiOutlinePicLeft } from "react-icons/ai";
import Layout from "../../components/siteLayout";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../../hooks/SiteMetadata";
import TimeAgo from 'react-timeago';
import { MdArrowForwardIos } from 'react-icons/md';
import Seo from "../../components/seo";
// import { getSrc } from "gatsby-plugin-image";
import ReactPlayer from 'react-player/lazy';

const SearchPage = ({ data }) => {
  const { showModals, showDates, postcount, magicOptions, showNav, showArchive, showTitles } = useSiteMetadata();
  const { showMagic, showMagicCat, showMagicTag, showMagicSearch } = magicOptions;

  // const { markdownRemark } = data;
  // const { frontmatter, excerpt } = markdownRemark;

  const allPosts = data.allMarkdownRemark.edges;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  // eslint-disable-next-line
  const [visibleItems, setVisibleItems] = useState(postcount);

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





  useEffect(() => {
    setVisibleItems(postcount);
  }, [filteredPosts, postcount]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
    setVisibleItems(postcount);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedTag("");
    setVisibleItems(postcount);
  };

  const handleTagChange = (event) => {
    const tag = event.target.value;
    setSelectedTag(tag);
    setSelectedCategory("");
    setVisibleItems(postcount);
  };

  const [numVisibleItems, setNumVisibleItems] = useState(postcount);

  const showMoreItems = () => {
    setNumVisibleItems((prevNumVisibleItems) => prevNumVisibleItems + postcount);
  };

  function clearfield() {
    document.querySelector('#clearme').value = '';
    setQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    setVisibleItems(postcount);
  }

  return (
    <Layout>
      <Helmet>
        <body id="body" className="homepage" />
      </Helmet>

      <Seo
        title=""
        description=""
  
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
                        background: '#222',
                        outline: '1px solid #111',
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
          background: '#222',
          outline: '1px solid #111',
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
                        background: '#222',
                        marginRight: '',
                        outline: '1px solid #111',
                        borderRadius: '3px',
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
                onClick={clearfield}
                style={{
                  position: '',
                  right: '',
                  top: '',
                  background: '#222',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: '10px',
                  height: '',
                  maxWidth: '',
                  outline: '1px solid #111',
                  padding: '5px',
                  borderRadius: '3px',
                  lineHeight: '100%',
                }}
                aria-label="Clear"
              >
                clear
              </button>

              <div style={{ position: '', right: '', top: '', textAlign: 'center', fontSize: '9px', color: '#fff', maxWidth: '' }}>
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
          <div key={index} className="post-card1" style={{ alignItems: '', overFlow:'visible' }}>
            <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>
              {node.frontmatter.youtube.showVidOnly ? (
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
                      src="../../../static/assets/default-og-image.webp"
                      alt="Default Image"
                      style={{ position: 'relative', zIndex: '' }}
                    />
                  )}
                </div>
              )}

              <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>
                {node.frontmatter.youtube.showVidOnly ? (
                  ""
                ) : (
                  <>
                    {node.frontmatter.youtube.youtuber ? (
                      <div className="spotlight" style={{ marginLeft: '10%', marginTop: '-28%', margin: '-24% 10% 0 10%' }}>
                        <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                            <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px, fontSize: ""' }} />
                          </div>
                          Play Multimedia
                        </div>
                      </div>
                    ) : ("")}
                  </>
                )}

                <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent:'center', margin: '10px auto', maxWidth: '', gap: '.4vw', maxHeight: '74px', textAlign: 'left', padding: '10px 30px', fontSize: 'clamp(.7rem,.8vw,.7rem)', outline:'0px solid #444', overFlow:'hidden', lineHeight:'2.4vh', borderRadius:'3px', background: showTitles ? 'rgba(0, 0, 0, 0.8)' : 'transparent', }}>
                  {showTitles ? (
                    <h2 className="title1" style={{width:'100%', textShadow:'0 1px 1px #222',}}>{node.frontmatter.title}</h2>
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
            </Link>
          </div>
        ))}

{numVisibleItems < filteredPosts.length && (
          <div className="loadmore" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', placeSelf: 'center', gap: '',  textAlign: 'center' }}>
            <button className="button load-more font" onClick={showMoreItems} style={{maxWidth:''}}>
              Load more
            </button>
            {showArchive ? (
              <Link to="/archive" className="font" style={{ background: 'rgba(0, 0, 0, 0.8)', borderRadius: '5px', color: '#fff', display: 'flex', padding: '8px', margin: '0 auto', justifyContent:'center' }}>View Archive &nbsp;<MdArrowForwardIos style={{ marginTop: '' }} /></Link>
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
  query ($postcount: Int) {
    allMarkdownRemark(
      sort: [{ frontmatter: { spotlight: ASC } }, { frontmatter: { date: DESC } }]
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: $postcount
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
    markdownRemark {
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

export default SearchPage;

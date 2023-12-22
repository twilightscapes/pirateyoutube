import React, { useState, useEffect } from "react";
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
import { useView } from "../contexts/ViewContext";
import styled from "styled-components";

const CustomBox = styled.div`
  .post-container {
    padding: 0;
    width: 100vw;
  }

  .horizontal-scroll1 {
    display: flex;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-align: center;
  }

  .grid-container {
    overflow-y: scroll;
  }

  .slider {
    display: flex;
    scroll-snap-type: x mandatory;
    width: 300vw;
    gap: 25px;
    scroll-padding: 0 5%;
    overscroll-behavior: contain;
    scroll-snap-align: center;
  }


  .post-card1 {
    min-height: ${(props) => (props.isHorizontalScroll ? "80vh" : "30vh")};
    max-height: 30vh;
    overflow: hidden;
    display: grid;
    place-content: center;
    color: #ddd;
    width: ${(props) => (props.isHorizontalScroll ? "100vw" : "300px")};
    flex: ${(props) => (props.isHorizontalScroll ? "0 0 33.3333%" : "1")};
  }
`;

const HorizontalScroll = () => {
  const [horizontalScroll, setHorizontalScroll] = useState(false);

  
  useEffect(() => {
    const handleWheel = (event) => {
      const sliderContainer = document.querySelector(".horizontal-scroll1");
      if (sliderContainer) {
        if (horizontalScroll) {
          // Only handle horizontal scrolling in horizontal view
          event.preventDefault();
          sliderContainer.scrollLeft += event.deltaY;
        } else if (sliderContainer.classList.contains("grid-container")) {
          // Only handle vertical scrolling in grid view
          sliderContainer.scrollTop += event.deltaY;
        }
      }
    };
    

    const sliderContainer = document.querySelector(".horizontal-scroll1");

    if (sliderContainer) {
      sliderContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (sliderContainer) {
        sliderContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return [horizontalScroll, setHorizontalScroll];
};

const HomePage = ({ data }) => {


  const { showModals, showDates, homecount, postcount, magicOptions, showNav, showArchive, showTitles } = useSiteMetadata();
  const { markdownRemark } = data;
  const { frontmatter, excerpt } = markdownRemark;

  const allPosts = data.allMarkdownRemark.edges;
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [visibleItems, setVisibleItems] = useState(homecount);

  const allCategoriesSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.category));
  const allCategories = Array.from(allCategoriesSet);

  const allTagsSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.tags));
  const allTags = Array.from(allTagsSet);

  const filteredPosts = allPosts.filter(({ node }) => {
    const { title, tags, category: categories } = node.frontmatter;
    const titleMatch = query === "" || title.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = selectedCategory === "" || (Array.isArray(categories) ? categories.includes(selectedCategory) : categories === selectedCategory);
    const tagMatch = selectedTag === "" || (tags && tags.includes(selectedTag));

    return titleMatch && categoryMatch && tagMatch;
  });

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

  const clearfield = () => {
    document.querySelector('#clearme').value = '';
    setQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    setVisibleItems(homecount);
  };

  const [horizontalScroll, setHorizontalScroll] = HorizontalScroll();

  const toggleView = () => {
    setHorizontalScroll((prev) => !prev);
  };

  return (
    <CustomBox isHorizontalScroll={horizontalScroll}>
      <Layout>
        <Helmet>
          <body id="body" className="homepage" />
        </Helmet>

        <Seo
          title={frontmatter.title}
          description={frontmatter.description ? frontmatter.description : excerpt}
          image={getSrc(frontmatter.featuredImage)}
        />

        <button onClick={toggleView}>Toggle View</button>
        <div className="post-container">
          <div className={horizontalScroll ? "horizontal-scroll1 contentpanel" : "grid-container contentpanel"} style={{ paddingRight: '' }}>

            {horizontalScroll && (
              <div className="slider">
                {filteredPosts.slice(0, numVisibleItems).map(({ node }, index) => (
                  <div key={index} className="post-card1" style={{ alignItems: 'center' }}>
                    <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>
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
                      <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>
                        {node.frontmatter.youtube.youtuber ? (
                          <div className="spotlight" style={{ marginLeft: '10%', marginTop: '-28%', margin: '-24% 10% 0 10%' }}>
                            <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                                <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                                <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                                <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: "" }} />
                              </div>
                              Play Multimedia
                            </div>
                          </div>
                        ) : ("")}

                        {showTitles ? (
                          <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px auto', maxWidth: '80vw', gap: '.4vw', height: '', textAlign: 'center', padding: '1vh 2vw', fontSize: 'clamp(1rem, 1vw, 1rem)', color: '' }}>
                            <h2 className="title1">{node.frontmatter.title}</h2>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </Link>
                    {showDates ? (
                      <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '70%', minWidth: '100px' }}>
                        <TimeAgo date={node.frontmatter.date} />
                      </p>
                    ) : ("")}
                  </div>
                ))}

                {numVisibleItems < filteredPosts.length && (
                  <div className="loadmore" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', placeSelf: 'center', gap: '', textAlign: 'center' }}>

                    <button className="button load-more" onClick={showMoreItems} style={{ maxWidth: '' }}>
                      Load more
                    </button>

                    {showArchive ? (
                      <Link to="/archive" style={{ background: 'rgba(0, 0, 0, 0.8)', borderRadius: '5px', color: '#fff', display: 'flex', padding: '0 1vh', margin: '0 auto' }}>View Archive &nbsp;<MdArrowForwardIos style={{ marginTop: '4px' }} /></Link>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            )}

            {!horizontalScroll && (
              <>
                {filteredPosts.slice(0, numVisibleItems).map(({ node }, index) => (
                  <div key={index} className="post-card1" style={{ alignItems: 'center' }}>
                    <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>
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
                      <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>
                        {node.frontmatter.youtube.youtuber ? (
                          <div className="spotlight" style={{ marginLeft: '10%', marginTop: '-28%', margin: '-24% 10% 0 10%' }}>
                            <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                                <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                                <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                                <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: "" }} />
                              </div>
                              Play Multimedia
                            </div>
                          </div>
                        ) : ("")}

                        {showTitles ? (
                          <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px auto', maxWidth: '80vw', gap: '.4vw', height: '', textAlign: 'center', padding: '1vh 2vw', fontSize: 'clamp(1rem, 1vw, 1rem)', color: '' }}>
                            <h2 className="title1">{node.frontmatter.title}</h2>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </Link>
                    {showDates ? (
                      <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '70%', minWidth: '100px' }}>
                        <TimeAgo date={node.frontmatter.date} />
                      </p>
                    ) : ("")}
                  </div>
                ))}

                {numVisibleItems < filteredPosts.length && (
                  <div className="loadmore" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', placeSelf: 'center', gap: '', textAlign: 'center' }}>

                    <button className="button load-more" onClick={showMoreItems} style={{ maxWidth: '' }}>
                      Load more
                    </button>

                    {showArchive ? (
                      <Link to="/archive" style={{ background: 'rgba(0, 0, 0, 0.8)', borderRadius: '5px', color: '#fff', display: 'flex', padding: '0 1vh', margin: '0 auto' }}>View Archive &nbsp;<MdArrowForwardIos style={{ marginTop: '4px' }} /></Link>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Layout>
    </CustomBox>
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

export default HomePage;
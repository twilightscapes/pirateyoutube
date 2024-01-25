import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
// import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";
// import useSiteMetadata from "../hooks/SiteMetadata";
import BlogPosts from "../components/HomePosts";
import Seo from "../components/seo";
import { getSrc } from "gatsby-plugin-image";


const HomePage = ({ data }) => {

  
  // const { dicLoadMore, dicViewArchive, dicCategory, dicKeyword, dicSearch, dicClear, dicResults, dicPlayVideo, dicPlayMultimedia  } = language;



  const { markdownRemark } = data;
  const { frontmatter, excerpt } = markdownRemark;

  const [isSliderVisible, setIsSliderVisible] = useState(() => {
    const storedValue = localStorage.getItem("isSliderVisible");
    try {
      return JSON.parse(storedValue) ?? true;
    } catch (error) {
      return true;
    }
  });

  useEffect(() => {
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
  }, []);

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

<div className="post-container">
<BlogPosts isSliderVisible={isSliderVisible} />
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

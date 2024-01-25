import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";
import BlogPosts from "../components/BlogPosts";
import Seo from "../components/seo";
import { getSrc } from "gatsby-plugin-image";

const HomePage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, excerpt } = markdownRemark;

  const [isSliderVisible, setIsSliderVisible] = useState(true); // Default value

  useEffect(() => {
    // Check if window is defined to ensure it's running in a client-side environment
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem("isSliderVisible");
      try {
        setIsSliderVisible(JSON.parse(storedValue) ?? true);
      } catch (error) {
        setIsSliderVisible(true);
      }
    }
  }, []); // Empty dependency array ensures it runs only once during component mount on the client side

  useEffect(() => {
    // Update isSliderVisible when it changes in localStorage
    const handleStorageChange = () => {
      // Check if window is defined to ensure it's running in a client-side environment
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem("isSliderVisible");
        try {
          setIsSliderVisible(JSON.parse(storedValue) ?? true);
        } catch (error) {
          setIsSliderVisible(true);
        }
      }
    };

    // Add event listener for storage change
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", handleStorageChange);
    }

    // Cleanup function to remove event listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("storage", handleStorageChange);
      }
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
        image={frontmatter.featuredImage ? getSrc(frontmatter.featuredImage) : null}
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

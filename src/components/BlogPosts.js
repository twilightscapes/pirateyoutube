import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

const BlogPosts = () => {
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  // Toggle function
  const toggleSlider = () => {
    setIsSliderVisible(!isSliderVisible);
  };

  // GraphQL query to fetch data
  const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark(
      sort: [{frontmatter: {spotlight: ASC}}, {frontmatter: {date: DESC}}]
      filter: { frontmatter: { template: { eq: "blog-post" }, draft: { ne: true } } }
      limit: 3
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
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
            spotlight
            draft
          }
        }
      }
    }
  }
`);




  // Extracting data from the GraphQL query result
  const posts = data.allMarkdownRemark.edges;

  // Function to render the content with or without the slider div
  const renderContent = () => {
    if (isSliderVisible) {
      return (
        <div className="slider">
          {posts.map(({ node }) => (
            <div key={node.id} className="post-card1">
              {/* Render your post content here */}
              <h3>{node.frontmatter.title}</h3>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <>
          {posts.map(({ node }) => (
            <div key={node.id} className="post-card1">
              {/* Render your post content here */}
              <h3>{node.frontmatter.title}</h3>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <>
    
    <div className="horizontal-scroll1 contentpanel">
      {renderContent()}
      
    </div>
    <button onClick={toggleSlider}>Toggle Slider</button>
    </>
  );
};

export default BlogPosts;

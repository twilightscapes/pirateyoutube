// index-page.js
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/siteLayout';
import useSiteMetadata from '../hooks/SiteMetadata';
import HomePosts from '../components/homeposts';
import { Helmet } from 'react-helmet';

export const query = graphql`
  query HomePostsQuery($homecount: Int) {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___spotlight, frontmatter___date], order: [DESC, DESC] }
      limit: $homecount
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
            youtube {
              youtuber
            }
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  quality: 80
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
      }
    }
  }
`;













const HomePage = ({ data, pageContext }) => {
  const { showNav } = useSiteMetadata();
  const { siteUrl } = useSiteMetadata();
  const { homecount } = pageContext;

  return (
    <Layout>
      <Helmet>
        <body className="homepage utilitypage" />
      </Helmet>
      {siteUrl}
      {showNav ? (
        <div className='spacer' style={{ height: '70px', border: '0px solid yellow' }}></div>
      ) : (
        <div className="spacer2" style={{ height: "0", border: "0px solid yellow" }}></div>
      )}

      <HomePosts data={data} />
    </Layout>
  );
};

export default HomePage;

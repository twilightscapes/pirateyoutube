// HomePage.js

import React from 'react';
import { graphql } from 'gatsby'; // Import graphql from 'gatsby'
import Layout from '../components/siteLayout';
import useSiteMetadata from '../hooks/SiteMetadata';
import { Helmet } from 'react-helmet';
import HomePosts from '../components/homeposts';

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      sort: { frontmatter: { date: ASC } }
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

const HomePage = ({ data }) => {
  const { showNav } = useSiteMetadata();
  const { siteUrl } = useSiteMetadata();
  return (
    <Layout>
      <Helmet>
        <body className="archivepage utilitypage" />
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

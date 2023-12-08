import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/siteLayout';
import HomePosts from '../components/homeposts';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../hooks/SiteMetadata';
export const query = graphql`
query HomePostsQuery($homecount: Int) {
  allMarkdownRemark(
    filter: { frontmatter: { template: { eq: "blog-post" } } }
    sort: [{ frontmatter: { spotlight: DESC } }, { frontmatter: { date: DESC } }]
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
  const { showNav, siteUrl } = useSiteMetadata();

  return (
    <Layout>
      <Helmet>
        <body className="homepage utilitypage" />
      </Helmet>
      {siteUrl}
      {showNav ? (
        <div className="spacer" style={{ height: '70px', border: '0px solid yellow' }}></div>
      ) : (
        <div className="spacer2" style={{ height: '0', border: '0px solid yellow' }}></div>
      )}

      <HomePosts data={data} />
    </Layout>
  );
};

export default HomePage;

import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/siteLayout";
import useSiteMetadata from "../hooks/SiteMetadata";
import { Helmet } from "react-helmet";
import Seo from "../components/seo";

const TeamPage = ({ data }) => {
  const { showNav } = useSiteMetadata();
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout className="contact-page">
      <Helmet>
        <body className="contactpage utilitypage" />
      </Helmet>
      <Seo title="" description="" />

      {showNav ? (
        <div className="spacer" style={{ height: '60px', border: '0px solid yellow' }}></div>
      ) : (
        ''
      )}
      <div>
        <div className="contentpanel grid-container" style={{ padding: '' }}>
          <div className="sliderSpacer" style={{ height: '', paddingTop: '', display: '' }}></div>

          {posts.map(({ node }) => (
            <div className="post-card1 grid-item" style={{ alignItems: 'center' }} key={node.id}>
              <a href={node.frontmatter.slug}>
                {node.frontmatter.profilePicture && (
                  <GatsbyImage
                    image={node.frontmatter.profilePicture.childImageSharp.gatsbyImageData}
                    alt={node.frontmatter.name}
                  />
                )}
                <h2>{node.frontmatter.name}</h2>
                <p>{node.frontmatter.jobTitle}</p>
                {/* Add additional details as needed */}
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/team/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            name
            list
            credentials
            jobTitle
            order
            slug
            profilePicture {
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

export default TeamPage;

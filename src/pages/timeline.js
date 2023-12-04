import React from "react";
import AuthenticatedTimeline from "../components/AuthenticatedTimeline";
import { useStaticQuery, graphql } from "gatsby";


const TimeLine = () => {
  useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/static/content/pages/index.md$/" }) {
        frontmatter {
          pagePW
        }
      }
    }
  `);

  return <AuthenticatedTimeline />;
};

export default TimeLine;

import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useLocation } from '@reach/router';

const BlueCheck = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const hasNetlifyApp = data.site.siteMetadata.siteUrl.includes('netlify.app');

  const location = useLocation();
  console.log(location);

  return (
    <span title="This site is verified">
      {hasNetlifyApp === true && (
        <BsFillCheckCircleFill style={{ color: '#1D9BF0' }} />
      )}
    </span>
  );
};

export default BlueCheck;

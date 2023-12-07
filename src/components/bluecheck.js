import * as React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useLocation } from '@reach/router';

const BlueCheck = () => {
  const location = useLocation();
  const hasNetlifyApp = location.pathname.includes('netlify.app');

  return (
    <span title="This site is verified">
      {hasNetlifyApp === false && (
        <BsFillCheckCircleFill style={{ color: '#1D9BF0' }} />
      )}
    </span>
  );
};

export default BlueCheck;

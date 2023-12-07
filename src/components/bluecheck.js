import * as React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useLocation } from '@reach/router';

const BlueCheck = () => {
  const location = useLocation();
  const isNetlifyApp = location.hostname.endsWith('netlify.app');

  return (
    <span title="This site is verified">
      {!isNetlifyApp && <BsFillCheckCircleFill style={{ color: '#1D9BF0' }} />}
    </span>
  );
};

export default BlueCheck;

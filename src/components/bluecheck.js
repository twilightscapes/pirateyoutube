import * as React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useLocation } from '@reach/router';

const BlueCheck = () => {
  const location = useLocation();
  console.log(location);
  const isNetlifyApp = location.hostname.endsWith('netlify.app');
  console.log(isNetlifyApp);
  return (
    <span title="This site is verified">
      {!isNetlifyApp && <BsFillCheckCircleFill style={{ color: '#1D9BF0' }} />}
    </span>
  );
};

export default BlueCheck;

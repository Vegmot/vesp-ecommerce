import React from 'react';
import { Icon } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <>
      <div
        style={{
          paddingTop: '10vh',
          paddingLeft: '20vw',
          paddingRight: '20vw',
        }}
      >
        <h1>
          <Icon name='warning sign' /> The page you are trying to reach does not
          exist.
        </h1>
      </div>
    </>
  );
};

export default NotFound;

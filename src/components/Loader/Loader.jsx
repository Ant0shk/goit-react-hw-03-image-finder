import React from 'react';
import {FallingLines} from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div>
      <FallingLines
        visible={true}
        height="80"
        width="80"
        ariaLabel="FallingLines-loading"
        wrapperStyle={{}}
        wrapperClass="FallingLines-wrapper"
        glassColor="#c0efff"
        color="#696969"
      />
    </div>
  );
};
import React from 'react';

const LineDiv = ({ children } : any) => {
  return (
    <div style = {{display: 'flex', gap: '5px', alignItems: 'center'}}>
      {children}
    </div>
  );
};

export default LineDiv;
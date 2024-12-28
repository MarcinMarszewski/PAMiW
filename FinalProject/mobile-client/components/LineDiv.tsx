import React from 'react';

import { ReactNode } from 'react';

const LineDiv = ({ children }: { children: ReactNode }) => {
  return (
    <div style = {{display: 'flex', gap: '5px', alignItems: 'center'}}>
      {children}
    </div>
  );
};

export default LineDiv;
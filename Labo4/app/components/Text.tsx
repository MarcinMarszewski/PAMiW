import React from 'react';

interface TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children }) => {
  return <span style={{ display: 'inline-block', width: '172px' }}>{children}</span>;
};

export default Text;
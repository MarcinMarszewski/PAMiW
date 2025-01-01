import React from 'react';

interface TextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({ children, style } : TextProps) => {
  return <span style={{ display: 'inline-block', width: '172px', ...style }}>{children}</span>;
};

export default Text;
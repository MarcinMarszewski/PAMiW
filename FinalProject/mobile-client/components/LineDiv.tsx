import React, { CSSProperties } from 'react';
import { ReactNode } from 'react';
import styles from './LineDiv.module.css';

interface LineDivProps {
  children?: ReactNode;
  style?: CSSProperties;
}

const LineDiv = ({ children, style }: LineDivProps) => {
  return (
    <div style = {{ ...style}} className={styles.line_div}>
      {children}
    </div>
  );
};

export default LineDiv;
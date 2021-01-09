import React from 'react';
import styles from './PageHeading.module.css';

export const PageHeading = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{children}</h2>
    </div>
  );
};

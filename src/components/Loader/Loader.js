import React from 'react';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div class={styles.loader} role="status">
      Loading...
    </div>
  );
};

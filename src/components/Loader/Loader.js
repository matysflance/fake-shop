import { memo } from 'react';
import styles from './Loader.module.css';

export const Loader = memo(() => {
  return (
    <div className={styles.loader} role="status">
      Loading...
    </div>
  );
});

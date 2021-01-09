import React from 'react';
import styles from './Alert.module.css';
import clsx from 'clsx';

export const Alert = ({ message, type }) => {
  return (
    <div
      className={clsx(styles.alert, type === 'danger' ? styles.alertDanger : styles.alertSuccess)}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
};

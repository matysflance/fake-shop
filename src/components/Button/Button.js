import { memo } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button = memo(
  ({ children, type = 'button', fullWidth, additionalClasses, handleClick }) => {
    return (
      <button
        type={type}
        className={clsx(
          styles.btn,
          styles.primary,
          fullWidth && styles.btnBlock,
          additionalClasses,
        )}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  },
);

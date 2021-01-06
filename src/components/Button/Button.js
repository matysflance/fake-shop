import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button = ({ children, type = 'button', fullWidth }) => {
    return (
        <button type={type} className={clsx(styles.btn, styles.primary, fullWidth && styles.btnBlock)}>{children}</button>
    )
}
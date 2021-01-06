import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button = ({ children, type, fullWidth }) => {
    return (
        <button className={clsx(styles.btn, styles.primary, fullWidth && styles.btnBlock)}>{children}</button>
    )
}
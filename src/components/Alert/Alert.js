import React from 'react';

import './Alert.css';

export const Alert = ({ type, message }) => {
    return (
        <div className={`alert alert--${type}`} role='alert' aria-live='assertive'>
            {message}
        </div>
    )
}
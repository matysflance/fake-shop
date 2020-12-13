import React from 'react';

import './Alert.css';

const Alert = ({ type, message }) => {
    console.log(type);
    console.log(message);
    return (
        <div className={`alert alert--${type}`}>
            {message}
        </div>
    )
}

export default Alert;
import React from 'react';

import './error-indicator.css';
import icon from './cat-poo-2.png';

const  ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img width="100" src={icon} alt="death star"/>
            <span className="boom">OOPS!</span>
            <span>
                something has gone terribly wrong
            </span>
            <span>
                (but we already sent cat to fix it)
            </span>
        </div>
    );
};

export default ErrorIndicator;

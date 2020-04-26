import React from 'react';

const Counter = ({ counter, inc, dec, rnd }) => {
    return (
        <div id="root" className="jumbotron">
            <h2>{counter}</h2>
            <button 
                onClick={dec}
                className="btn btn-primary btn-lg">DEC</button>
            <button 
                onClick={inc}
                className="btn btn-primary btn-lg">INC</button>
            <button 
                onClick={rnd}
                className="btn btn-primary btn-lg">+RANDOM</button>
        </div>
    );
};

export default Counter;
import './row.css';
import PropTypes from 'prop-types';

import React from 'react';

const Row = ({ left, right }) => {
    return (
        <div className="row mb-3">
            <div className="col-md-6">
                {left}  
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
};

Row.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node
};

export default Row;
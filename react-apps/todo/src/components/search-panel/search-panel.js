import React from 'react';

import './search-panel.css';

const SearchPanel = ({
    onSearchItems }) => {
    const searchText = 'Type here to search';
    const searchStyle = {
        fontSize: '25px'
    };

    return (
        <div>
            <input
                style={searchStyle} 
                placeholder={searchText} 
                onChange={(e) => onSearchItems(e.target.value)}/>
        </div>
    );
};

export default SearchPanel;

 
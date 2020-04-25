import React from 'react';
import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom';

const StarshipsPage = ( { history }) => {

    return (
        <StarshipList 
            itemSelected={(id) => {
                //history.push(`/starships/${itemId}`)
                history.push(id);
            }} />
    );

};

export default withRouter(StarshipsPage);

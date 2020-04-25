import React from 'react';
import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ history, match }) => {
    const { id } = match.params;

    return (
        <Row
            left={<PersonList itemSelected={(id) => history.push(id)} />}
            right={<PersonDetails itemId={id} />}
        />
    );
}

export default withRouter(PeoplePage);
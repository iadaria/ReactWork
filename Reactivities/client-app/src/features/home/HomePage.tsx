import React from 'react'
import { Container } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>Home page</h1>
            <h3>Go to <Link to='/activities/'>Activities</Link></h3>
        </Container>
    );
};


export default observer(HomePage);
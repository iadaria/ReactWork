import React from 'react';
import { Redirect } from 'react-router-dom';

export const SecretPage = ({isLoggedIn}) => {

    if (isLoggedIn) {
        return (
            <div className="jumbotron text-center">
                <h3>This page is full of secrets!!!</h3>
            </div>
        );
    }

    //return <p>You should not see this!</p>;
    return <Redirect to="/login" />;
};
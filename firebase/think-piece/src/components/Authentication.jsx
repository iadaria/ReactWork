import React, { useContext } from 'react';
import CurrentUser from './CurrentUser';
//import SignInAndSignUp from './SignInAndSignUp';
import SignIn from './SignIn';
import { UserContext } from './providers/UserProvider';

const Authentication = () => {
    const user = useContext(UserContext);
    //if (loading) return null;
    //console.log('Authentication user is ', user);
    return <div>{user ? <CurrentUser {...user} /> : <SignIn />}</div>;
};

export default Authentication;

import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
//import SignIn from './SignIn';

const Authentication = ({ user, loading }) => {
  if (loading) return null;

  return <div>{user ? <CurrentUser {...user}/> : <SignInAndSignUp />}</div>;
};

export default Authentication;

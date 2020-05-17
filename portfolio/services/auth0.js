import auth0 from 'auth0-js';

class Auth0 {

    auth0 = new auth0.WebAuth({
        domain: 'iadaria.auth0.com',
        clientID: 'UUKakvLVXRJMUwzBniMV85IxLA5wWe1w',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    login() {
        this.auth0.authorize();
    }
}

const auth0Client = new Auth0();

export default auth0Client;
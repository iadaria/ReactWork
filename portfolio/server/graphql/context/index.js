const passport = require('passport');

//options = { email, password }
const authenticateUser = (req, options) => {

    return new Promise((resolver, reject) => {
        const done = (error, user) => {
            if (error) {
                return reject(new Error(error));
            }
    
            if (user) {
                req.login(user, (error) => {
                    if (error) { return reject(new Error(error)); }
                    return resolver(user);
                });
            } else {
                return reject(new Error('Invalid password or email'));
            }
        };

        const authFn = passport.authenticate('graphql', options, done);
        authFn();
    });
};

exports.buildAuthContext = (request) => {
    const auth = {
        authenticate: (options) => authenticateUser(request, options),
        logout: () => request.logout(),
        isAuthenticated: () => request.isAuthenticated(),
        getUser: () => request.user
    };

    return auth;
};
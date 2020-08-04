const path = require('path');

const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const dev = process.env.NODE_ENV !== 'production';

module.exports = withCSS(withSass({
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
    },
    env: {
        BASE_URL: dev ? "http://localhost:3000/graphql" : "https://iadaria.herokuapp.com/graphql"
    }
}));
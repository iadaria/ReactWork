const routes = require('next-routes');

module.exports = routes()
    .add('test', '/test/:id');
//.add('about')
//.add('blog', '/blog/:slug')
//.add('user', '/user/:id', 'profile')
//.add('/:noname/:lang(en|ru)/:wow+', 'complex')      // user   profile /user/:id
//.add({name: 'beta', pattern: '/v3', page: 'v3'});   // (none) complex /:noname/:
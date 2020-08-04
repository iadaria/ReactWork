if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod'); 
} else {
    module.exports = require('./dev');
}

//mongodb+srv://test:testtest@cluster0.hpxaw.mongodb.net/portfolioDb?retryWrites=true&w=majority

const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

//Load env vars
dotenv.config({ path: './config/config.env'});

const messages = require('./routes/messages');

const app = express();
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v0/messages', messages);

app.use(errorHandler);

const PORT = parseInt(process.env.PORT) || 5000;
const server = app.listen(
    PORT,
    '127.0.0.1',
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`ERror ${err.message}`.red);
    server.close(() => process.exit(1));
})
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');
dotenv.config({path: './config/config.env'});

connectDB();

// Route files
const transactions = require('./routes/transaction');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// routes
app.use('/api/protected/transactions', transactions);
app.use('/', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`.red);
    server.close(() => process.exit(1));
})
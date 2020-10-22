const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env'});

//Load models;
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Session = require('./models/Session');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const transactions = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/transactions.json`, 'utf-8')
);

const sessions = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/sessions.json`, 'utf-8')
);

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
    try {
        await Transaction.create(transactions);
        await Session.create(sessions);
        await User.create(users);
        console.log('Date Imported ...'.black.bgGreen);
        process.exit();
    } catch (error) {
        console.error(error);

    }
};

// Import into DB
const deleteData = async () => {
    try {
        await Transaction.deleteMany();
        await Session.deleteMany();
        await User.deleteMany();
        console.log('Data Destoryed...'.black.bgRed);
        process.exit();
    } catch (error) {
        console.error(error);

    }
};

if (process.argv[2] === '-i') {
    importData();
}
else if (process.argv[2] === '-d') {
    deleteData();
}

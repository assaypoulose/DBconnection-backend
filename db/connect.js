const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connection established.');
    } catch (error) {
        console.error('Error connecting to database:', error);
        // Optionally, throw the error again to propagate it
        // throw error;
    }
};

module.exports = db;
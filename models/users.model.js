const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    roleNumber: {
        type: Number,
        default: 3,
        required: true
    },
    bloodGroup: {
        type: String
    }
});


module.exports = mongoose.model('Users', userSchema);
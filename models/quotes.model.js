const mongoose = require('mongoose');


const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Quotes', quoteSchema)
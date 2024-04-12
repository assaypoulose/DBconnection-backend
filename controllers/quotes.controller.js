const express = require('express');
const Quotes = require('../models/quotes.model');
const { MongooseError } = require('mongoose');

exports.getAllQuotes = async (req, res) => {
    try {
        console.log('Query Params: ', req.query)
        const quotes = await Quotes.find().exec();
        res.status(200).send(quotes);
        } catch (error) {
            console.error('Error while retrieving quotes:', error);
        if (error instanceof MongooseError) {
            res.status(400).send({ message: 'Error while retrieving quotes.' });
        } else {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}

exports.getQuoteByID = async (req, res) => {
    try{
        const quotes = await Quotes.findOne().exec();
        res.status(200).send(quotes);
    } catch (error) {
        console.error('Error while retrieving quote:', error);
    if (error instanceof MongooseError) {
        res.status(400).send({ message: 'Error while retrieving quote.' });
    } else {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
}


exports.addQuote = async (req, res) => {
    try {
        const payload = req.body;
        const newQuote = new Quotes(payload);
        await newQuote.save();
        res.status(200).send({ message: 'Quote has been added successfully' });
    } catch (error) {
        console.error('Error while saving the quote:', error);
        if (error instanceof MongooseError) {
            res.status(400).send({ message: 'Error while adding quotes.' });
        } else {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}

exports.updateQuote = async (req, res) => {
    try {
        const payload = req.body;
        const updatedQuote = await Quotes.findByIdAndUpdate(req.params.quoteID, payload, { new: true });
        
        if (!updatedQuote) {
            return res.status(404).send({ message: 'Quote not found' });
        }
        
        res.status(200).send(updatedQuote);
    } catch (error) {
        console.error('Error while updating the quote:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

exports.deleteQuote = async (req, res) => {
    try {
        const deletedQuote = await Quotes.findByIdAndDelete(req.params.quoteID);

        if (!deletedQuote) {
            return res.status(404).send({ message: 'Quote not found' });
        }

        res.status(200).send({ message: 'Quote has been deleted successfully' });
    } catch (error) {
        console.error('Error while deleting the quote:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
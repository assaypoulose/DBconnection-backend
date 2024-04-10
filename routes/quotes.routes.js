const express = require('express');
const Quotes = require('../models/quotes.model');

const router = express.Router();

//GET - > to retrive data
router.get('/quotes',(req, res) => {
    try{
    Quotes.find((err, data)=>{
        if(err){
            return res.status(400).send({message: 'Error while retriving quotes.'})
        }
        return res.status(200).send(data);
    })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
});
//GET - > to retrive 1 data
router.get('/quotes/quoteID',(req, res) => {
    try{
    Quotes.findOne({_id: req.params.quoteID},(err, data)=>{
        if(err){
            return res.status(400).send({message: 'Error while retriving quote.'})
        }
        res.status(200).send(data);
    })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
});

//POST -> to insert data
router.post('/quotes', async (req, res) => {
    try{
        const payload = await req.body;
        const newQuote = new Quotes(payload);
        newQuote.save((err, data)=>{
            if(err){
                return res.status(400).send({message: 'Error while sending the quote.'})
            }
            res.status(200).send({message: 'Quote has been added successfully'});
        });
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
});


//PUT -> To update data
router.put('/quotes/:quoteID',(req, res) => {
    try{
        const payload = req.body;

        Quotes.findByIdAndUpdate({_id: req.params.quoteID},{$set: payload}, (err, data)=>{
            if(err){
                return res.status(400).send({message: 'Error while updating the quote'})
            }
            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
});


//DELETE -> to delete data
router.delete('/quotes/:quoteID',(req, res) => {
    try{
        Quotes.deleteOne({_id: req.params.quoteID}, (err, res) =>{
            if(err){
                return res.status(400).send({message: 'Error while deleting the quote'})
            }
            res.status(200).send({message: 'Quote has been deleted succesfully'})
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
});


module.exports = router;
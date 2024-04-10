const express = require('express');

const router = express.Router();

//GET - > to retrive data
router.get('/quotes',(req, res) => {
    res.send('Getting all quotes')
});

//POST -> to insert data
router.post('/quotes', async (req, res) => {
    const payload = await req.body;
    res.send({message:'Inserting a new quote', data: payload})
});


//PUT -> To update data
router.put('/quotes/:quoteID',(req, res) => {
    const payload = req.body;
    res.send({message:'Updating an existing quote', data: payload})
});


//DELETE -> to delete data
router.delete('/quotes/:quoteID',(req, res) => {
    res.send('Deleting a quote')
});


module.exports = router;
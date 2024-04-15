const express = require('express');
const { getAllQuotes, getQuoteByID, addQuote, updateQuote, deleteQuote } = require('../controllers/quotes.controller');
const { requireSignIn, isAuth } = require('../utils/authentication');
const { getUserByID } = require('../controllers/user.controller')
const { isContentCreator } = require('../utils/authorization')
const router = express.Router();

//GET - > to retrive data
router.get('/:userID/quotes',requireSignIn, isAuth,getAllQuotes);

//GET - > to retrive 1 data
router.get('/:userID/quotes/quoteID',requireSignIn, isAuth,getQuoteByID);

//POST -> to insert data
router.post('/:userID/quotes',requireSignIn, isAuth, isContentCreator, addQuote);


//PUT -> To update data
router.put('/:userID/quotes/:quoteID',requireSignIn, isAuth, isContentCreator, updateQuote);


//DELETE -> to delete data
router.delete('/:userID/quotes/:quoteID',requireSignIn, isAuth, isContentCreator, deleteQuote);

router.param('userID', getUserByID);


module.exports = router;
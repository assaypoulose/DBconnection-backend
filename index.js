require('dotenv').config();
const express = require('express');

//Import all routes
const quotesRoutes = require('./routes/quotes.routes')

//Import DB
const db = require('./db/connect');

const app = express();
db(); //establishing the DB connection

app.use(express.json()); // to attach with app the express.json data

app.use(quotesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`App is running on PORT ${5001}`);
})
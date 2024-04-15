require('dotenv').config();
const express = require('express');

//Import all routes
const authRoutes = require('./routes/auth.routes');
const quotesRoutes = require('./routes/quotes.routes');
const userRoutes = require('./routes/user.routes');

//Import DB
const db = require('./db/connect');

const app = express();
db(); //establishing the DB connection

app.use(express.json()); // to attach with app the express.json data

app.get('/',(req, res)=>{
    res.status(200).send('Welcome to my Quotes Application')
})

app.use('/api',authRoutes);
app.use('/api',quotesRoutes);
app.use('/api',userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`App is running on PORT ${PORT}`);
});
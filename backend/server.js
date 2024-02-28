const express = require('express')
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const colors = require('colors');
const { errorHandler } = require('./middleware/erroHandler.js');
const dotenv = require('dotenv').config();
const cors = require('cors');



// connect to db
connectDB();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    methods: ['GET', 'POST'], // Allowed methods (adjust as needed)
}));

// to access the req.body(we set middleware here);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.send('chut')
})

// routes for admin
app.use('/api/admin', require('./routes/AdminRoutes.js'));

// routes for manager
app.use('/api/manager', require('./routes/ManagerRoutes.js'));




app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})
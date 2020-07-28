const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} respose : ${res.statusCode}`)
    })
    next();
});
// Import Router
const postsRoute = require('./routes/posts');

app.use('/', postsRoute);

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Successfully connected to DB')
);

app.listen(5000);
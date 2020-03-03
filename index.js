const config = require("config")
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const log = require('./middlewares/logger');
// const auth = require('./middlewares/Authenticate')
const morgan = require('morgan')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use(express.json());
app.use('/api/geners', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth)
app.use(morgan('tiny'))

if(!config.get('jwtPrivateKey')){
console.log("FATAL ERROR: jwtPrivateKey not found");
process.exit(1);
}

app.listen(3000, () => console.log('The server is running at 3000...'));

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true,useUnifiedTopology: true })
    .then((res) => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err))


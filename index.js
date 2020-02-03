const mongoose = require('mongoose')
const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const log = require('./middlewares/logger');
const auth = require('./middlewares/Authenticate')
const morgan = require('morgan')
app.use(express.json())

const genres = require('./routes/genres');

app.use('/api/geners', genres)
// console.log(app.get('env'))

// console.log(`Node ENV ${process.env.NODE_ENV}`)

// app.use(log)

// app.use(auth)

app.use(morgan('tiny'))

app.listen(3000, () => console.log('The server is running at 3000...'));

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true,useUnifiedTopology: true })
    .then((res) => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err))



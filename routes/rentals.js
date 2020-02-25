const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

const {Rental, validate} = require("../models/rental");
const {Customer} = require("../models/customer");
const {Movie} = require("../models/movie");


router.get('/', async (req, res) =>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})


router.post('/', async (req, res) =>{
    let {error, value} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer..');

    const movie = await Movie.findById(req.body.movieId);
    if(!customer) return res.status(400).send('Invalid customer..');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    let rental = new Rental({
        customer : {
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }

    })

    rental = await rental.save();

    movie.numberInStock--;
    moview.save();

    res.send(rental);
});
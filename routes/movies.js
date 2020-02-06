
const {Genre} = require('../models/genre')
const {Movie, validateMovie} = require('../models/movie')
const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title')
    res.send(movies)
});

router.post('/', async (req, res) => {
    let {error, value} = validateMovie(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.')
  
    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id: genre._id,
            name:genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    movie = await movie.save();

    res.send(movie)
})

router.put('/:id', async (req, res) => {
    let {error, value} = validateMovie(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let genere = await Genre.findById(req.body.genreId);
    if(!genere) return res.status(400).send('Invalid genre.')

    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        genere:{
            _id: genre._id,
            name:genere.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new : true
    })
    
    if(!movie) return res.status(400).send('The resouce with the given id was not found')
  
    res.send(movie)

})

router.get('/:id', async (req, res) => {
    let genere =  await Genre.findById(req.params.id);
    if(!genere) return res.status(400).send('The resouce with the given id was not found')
    return res.send(genere)
});

router.delete('/:id', async (req, res) => {
    // code block
    let movie =  await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('The resouce with the given id was not found')

    res.send(movie)
})

module.exports = router;
const {Genre} = require('../models/genre');
const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

router.get('/', async (req, res) => {
    const geners = await Genre.find().sort('name')
    res.send(geners)
});

router.post('/', async (req, res) => {
    let {error, value} = Joi.string().min(3).validate(req.body.name)
    if(error) return res.status(404).send(error.details[0].message)

    let genere = new Genre({ name:req.body.name });
    genre = await genere.save();
    res.send(genere);
})

router.put('/:id', async (req, res) => {
    let {error, value} = Joi.string().min(3).validate(req.body.name)
    if(error) return res.status(404).send(error.details[0].message)

    let genere = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {
        new : true
    })
 
    if(!genere) return res.status(400).send('The resouce with the given id was not found')
    genere.name = req.body.name;
    res.send(genere)

})

router.get('/:id', async (req, res) => {
    let genere =  await Genre.findById(req.params.id);
    if(!genere) return res.status(400).send('The resouce with the given id was not found')
    return res.send(genere)
});

router.delete('/:id', async (req, res) => {
    // code block
    let genere =  await Genre.findByIdAndRemove(req.params.id);
    if(!genere) return res.status(404).send('The resouce with the given id was not found')

    res.send(genere)
})

module.exports = router;


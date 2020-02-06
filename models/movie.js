const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const Joi = require('@hapi/joi');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
    type: String,
    require: true,
    trim:true,
    minLength:5,
    maxLength:255
    },
    genre: {
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type: Number,
        required: true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min:0,
        max:255
    }

}));

const validateMovie = async(movie) =>{
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).trim().required(),
        genreId: Joi.string().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    })

    const { error } = schema.validate(movie);
    return error;
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
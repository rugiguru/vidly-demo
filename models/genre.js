const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = new mongoose.Schema({
    name: {
    type: String,
    require: true,
    minLength:5,
    maxLength:50
    }
})
const Genre = mongoose.model('Genre', genreSchema);


function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    const { error } = schema.validate(genre);
    return error;

}
exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre
const mongoose = require('mongoose');


const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
    type: String,
    require: true,
    minLength:5,
    maxLength:50
    }
}));

exports.Genre = Genre;
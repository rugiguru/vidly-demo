const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
    type: String,
    require: true,
    minLength:5,
    maxLength:50
    }
})
const Genre = mongoose.model('Genre', genreSchema);

exports.Genre = Genre;
exports.genreSchema = genreSchema;
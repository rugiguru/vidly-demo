const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength:5,
        maxLength:50
    },
    email: {
        type: String,
        require: true,
        minLength:5,
        maxLength:255,
        unique:true
    },
    password: {
        type: String,
        require: true,
        minLength:5,
        maxLength:1024
    }
}));


const validateUser = user =>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });
    const { error } = schema.validate(user);
    return error;
}

exports.User = User;
exports.validate = validateUser;
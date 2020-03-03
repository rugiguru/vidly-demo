const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require("jsonwebtoken");
const config = require("config")

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);


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
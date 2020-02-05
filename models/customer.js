const mongoose = require('mongoose')
const Joi = require('@hapi/joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength:5,
        maxLength:50
    },
    isGold:{
        type: Boolean,
        default: false
    },
    phone: {
        type:Number,
        required:true,
        minlength:5
    }
}));

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });
    const { error } = schema.validate(customer);
    return error;

}

exports.Customer = Customer;
exports.validate = validateCustomer;
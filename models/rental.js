const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer :{
        type:new mongoose.Schema({
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
        }),
        required:true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
            type: String,
            require: true,
            trim:true,
            minLength:5,
            maxLength:255
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min:0,
                max:255
            }
        
        }),
        required:true
    },
    dateOut:{
        type: Date,
        required:true,
        default: Date.now
    },
    dateReturned:{
        type: Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
}));

const validateRental = rental =>{
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    const { error } = schema.validate(rental);
    return error;
}

exports.Rental = Rental;
exports.validate = validateRental;
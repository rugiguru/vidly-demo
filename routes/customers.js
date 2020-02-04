const mongoose = require('mongoose');
const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

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

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
});

router.post('/', async (req, res) => {
    let error = validateCustomer(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    let customer = new Customer({ 
        name:req.body.name, 
        isGold:req.body.isGold, 
        phone:req.body.phone 
    });
    customer = await customer.save();
    res.send(customer);
})

router.put('/:id', async (req, res) => {
    let {error} = validateCustomer(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        isGold:req.body.isGold, 
        phone:req.body.phone 
    }, {
        new : true
    })
 
    if(!customer) return res.status(400).send('The resouce with the given id was not found')
    customer.name = req.body.name;
    customer.isGold = req.body.isGold;
    customer.phone = req.body.phone;
    res.send(customer)

})

router.get('/:id', async (req, res) => {
    let customer =  await Customer.findById(req.params.id);
    if(!customer) return res.status(400).send('The resouce with the given id was not found')
    return res.send(customer)
});

router.delete('/:id', async (req, res) => {
    // code block
    let customer =  await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('The resouce with the given id was not found')

    res.send(customer)
})

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });
    const { error } = schema.validate(customer);
    return error;

}

module.exports = router;


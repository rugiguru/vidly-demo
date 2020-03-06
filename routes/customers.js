const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
});

router.post('/', async (req, res) => {
    // return console.log('rerere', req.body)
    let error = validate(req.body)
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
    let {error} = validate(req.body)
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

module.exports = router;
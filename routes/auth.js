const {User} = require('../models/user');
const express = require('express');
const bycrypt = require("bcrypt");
const Joi = require("@hapi/joi");


const router = express.Router();

router.post('/', async (req, res) => {
    let error = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bycrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

const validate = user =>{
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });
    const { error } = schema.validate(user);
    return error;
}


module.exports = router;
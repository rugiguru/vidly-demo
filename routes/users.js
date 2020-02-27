const {User, validate} = require('../models/user');
const express = require('express');
const bycrypt = require("bcrypt");

const router = express.Router();

router.post('/', async (req, res) => {
    let error = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(404).send('User already registered.');

     user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(user.password, salt);

    user = await user.save();
    
    res.send(user);
});


module.exports = router;
const express = require('express');

const router = express.Router();

let geners = [
    {id:'1', name:'Action'},
    {id:'2', name:'Horror'},
    {id:'3', name:'Thriller'}
]

router.get('/', (req, res) => {
    res.send(geners)
});

router.get('/:id', (req, res) => {
   
    let genere = geners.find(gen => gen.id == parseInt(req.params.id))
    if(!genere) return res.status(400).send('The resouce with the given id was not found')
    return res.send(genere)
});

router.post('/', (req, res) => {
    let {error, value} = Joi.string().min(3).validate(req.body.name)
    if(error) return res.status(404).send(error.details[0].message)

    let genere = {
        id: geners.length + 1,
        name:req.body.name
    }

    geners.push(genere)
    res.send(genere)
})


router.put('/:id', (req, res) => {
    let genere = geners.find(gen => gen.id == parseInt(req.params.id))
    if(!genere) return res.status(400).send('The resouce with the given id was not found')

    let {error, value} = Joi.string().min(3).validate(req.body.name)
    if(error) return res.status(404).send(error.details[0].message)

    genere.name = req.body.name;
    res.send(genere)

})

router.delete('/:id', (req, res) => {
    // code block
    let genere = geners.find(gen => gen.id == parseInt(req.params.id))
    if(!genere) return res.status(400).send('The resouce with the given id was not found')

    let index = indexOf(genere);
    geners = geners.splice(index, 1);
})

module.exports = router;


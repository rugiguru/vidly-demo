const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
app.use(express.json())

app.listen(3000, () => console.log('The server is running at 3000...'));
let geners = [
    {id:'1', name:'Action'},
    {id:'2', name:'Horror'},
    {id:'3', name:'Thriller'}
]

app.get('/api/geners', (req, res) => {
    res.send(geners)
});

app.get('/api/geners/:id', (req, res) => {
   
    let genere = geners.find(gen => gen.id == parseInt(req.params.id))
    if(!genere) return res.status(400).send('The resouce with the given id was not found')
    return res.send(genere)
});

app.post('/api/geners', (req, res) => {
    let {error, value} = Joi.string().min(3).validate(req.body.name)
    if(error) return res.status(404).send(error.details[0].message)

    let genere = {
        id: geners.length + 1,
        name:req.body.name
    }

    geners.push(genere)
    res.send(genere)
})


app.put('/api/geners/:id', (req, res) => {
    let genere = geners.find(gen => gen.id == parseInt(req.params.id))
    if(!genere) return res.status(400).send('The resouce with the given id was not found')

    let {error, value} = Joi.string().min(3).validate(req.body.name)
    if(error) return res.status(404).send(error.details[0].message)

    genere.name = req.body.name;
    res.send(genere)

})

app.delete('/api/geners/:id', (req, res) => {
    // code block
    let genere = geners.find(gen => gen.id == parseInt(req.params.id))
    if(!genere) return res.status(400).send('The resouce with the given id was not found')


})


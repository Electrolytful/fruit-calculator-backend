// set up express, .env config to use secret variables
const cors = require('cors');
const express = require('express');
const fruits = require('./fruits.json');
const logger  = require('./logger.js');
const app = express();

// adding the use of middleware
app.use(cors());
app.use(express.json());
app.use(logger);


// Home route
app.get('/', async (req, res, next) => {
    res.status(200).send('Hello, Fruity API');
})

// Return all the fruits route
app.get('/fruits', (req, res) => {
    res.status(200).send(fruits);
})

// Return a single fruit route
app.get('/fruits/:name', (req, res, next) => {
    let {name} = req.params;
    let object;

    // loop through the fruits array and find the right object and store in object variable
    fruits.forEach(obj => {
        if(obj.name.toLowerCase() === name.toLowerCase()) {
            object = obj;
        }
    })

    // if object is found and exists send it to client, else go next
    if(object) {
        res.status(200).send(object);
    } else {
        next();
    }
})

// adding fruit to the array and writing that change to the fruits.json file
app.post('/fruits', (req, res) => {
    // check if fruit exists, if not add it using req.body, else return an error
    let object = req.body;
    let exists = false;
    let idExists = false;
    object.id = Math.floor(Math.random() * 20000);

    fruits.forEach(obj => {
        if(object.name.toLowerCase() === obj.name.toLowerCase()) {
            exists = true;
        }

        if(object.id === obj.id) {
            idExists = true;
        }
    })

    while(idExists) {
        object.id = Math.floor(Math.random() * 20000);
    }

    if(exists) {
        res.status(409).send();
    } else {
        fruits.push(object);
        res.status(201).send(object);
    }
})

module.exports = app;

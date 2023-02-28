// set up express, .env config to use secret variables, cors to bypass CORS restrictions
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const fruits = require('./fruits.json');
const fs = require('fs');
const port = process.env.PORT;

// adding the use of middleware
app.use(express.json());
app.use(cors());

// make server listen on the specified port
app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
})

// Home route
app.get('/', (req, res) => {
    res.status(200).send('Hello, Fruity API');
})

// Return all the fruits route
app.get('/fruits', (req, res) => {
    res.status(200).send(fruits);
})

// Return a single fruit route
app.get('/fruits/:name', (req, res) => {
    let {name} = req.params;
    let object;

    // loop through the fruits array and find the right object and store in object variable
    fruits.forEach(obj => {
        if(obj.name.toLowerCase() === name.toLowerCase()) {
            object = obj;
        }
    })

    // if object is found and exists send it to client, else send 404 error
    if(object) {
        res.status(200).send(object);
    } else {
        res.status(404).send();
    }
})

// adding fruit to the array and writing that change to the fruits.json file
app.post('/fruits', (req, res) => {
    // check if fruit exists, if not add it using req.body, else return an error
    let object = req.body;
    let exists = false;

    fruits.forEach(obj => {
        if(object.name === obj.name) {
            exists = true;
        }
    })

    if(exists) {
        res.status(409).send(`Error: ${object.name} already exists!`);
    } else {
        fruits.push(object);
        fs.writeFileSync('./fruits.json', JSON.stringify(fruits));
        res.status(201).send('New object added successfully!');
    }
})


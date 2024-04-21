const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./models/tourModels');
const { type } = require('os');
const app = express();


dotenv.config({ path: './config.env'});
//const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = 'mongodb+srv://ashishchaudhary201993:Ashish123@ecomcluster.n0p0qqt.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=EcomCluster';
//const DB = 'mongodb+srv://ashishchaudhary201993:Ashish123@ecomcluster.n0p0qqt.mongodb.net/';
//const DB='mongodb+srv://ashish93kumark:Ashish1@cluster0.dsd48dn.mongodb.net/ashish93kumark?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB server connected");
}).catch(err => {
    console.log("error in connecting", err)
})


app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.json({
        status:'success',
        data: [
            tours
        ],
        results: tours.length
    })
});

app.get('/api/v1/tours/:id', (req, res) => {
    const { params } = req;
    const getTour = tours.find(el => el.id === +params.id);
    res.status(200).json({
        status: 'success',
        result: getTour
    });
})

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length-1].id + 1;
    const newTour = {...req.body, id: newId};
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})

const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log("server started");
})
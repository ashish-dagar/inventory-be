const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    rating: {
        type: String
    }
})

const movies = mongoose.model('movies', tourSchema);

module.exports = movies;
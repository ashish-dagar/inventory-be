
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'required field'],
        unique: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'field required']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

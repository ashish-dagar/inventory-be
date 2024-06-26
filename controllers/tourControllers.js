const Tour = require('./../models/tourModels');

exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();

    res.statue(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
    } catch(err) {
        message: err       
    }
}

exports.getTour = async (req, res) => {
    try {
        await Tour.findById(req.params.id);
        res.statue(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.statue(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.createTour = async (req, res) => {

    try {
        const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
    } catch (er) {
        res.statue(400).json({
            status: 'failed',
            message: 'error'
        })
    }
}
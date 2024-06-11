const Sweeper = require('../models/sweeper.model');

// Create a new sweeper
const createSweeper = async (req, res, next) => {
    const { sweeperId, name, numberOfComplaints } = req.body;

    try {
        const newSweeper = new Sweeper({ sweeperId, name, numberOfComplaints });
        await newSweeper.save();
        res.status(201).json(newSweeper);
    } catch (error) {
        next(error);
    }
};

// Get all sweepers
const getSweepers = async (req, res, next) => {
    try {
        const sweepers = await Sweeper.find();
        res.status(200).json(sweepers);
    } catch (error) {
        next(error);
    }
};

// Get a single sweeper by ID
const getSweeperById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const sweeper = await Sweeper.findById(id);
        if (!sweeper) {
            return res.status(404).json({ message: 'Sweeper not found' });
        }
        res.status(200).json(sweeper);
    } catch (error) {
        next(error);
    }
};

// Update a sweeper by ID
const updateSweeper = async (req, res, next) => {
    const { id } = req.params;
    const { sweeperId, name, numberOfComplaints } = req.body;

    try {
        const sweeper = await Sweeper.findByIdAndUpdate(
            id,
            { sweeperId, name, numberOfComplaints },
            { new: true, runValidators: true }
        );
        if (!sweeper) {
            return res.status(404).json({ message: 'Sweeper not found' });
        }
        res.status(200).json(sweeper);
    } catch (error) {
        next(error);
    }
};

// Delete a sweeper by ID
const deleteSweeper = async (req, res, next) => {
    const { id } = req.params;

    try {
        const sweeper = await Sweeper.findByIdAndDelete(id);
        if (!sweeper) {
            return res.status(404).json({ message: 'Sweeper not found' });
        }
        res.status(200).json({ message: 'Sweeper deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSweeper,
    getSweepers,
    getSweeperById,
    updateSweeper,
    deleteSweeper
};

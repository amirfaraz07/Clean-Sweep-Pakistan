const Area = require("../models/area.model");

// Create a new area
const createArea = async (req, res, next) => {
    const { name, status } = req.body;
    
    try {
        const newArea = new Area({ name, status });
        await newArea.save();
        res.status(201).json(newArea);
    } catch (error) {
        next(error);
    }
};

// Get all areas
const getAreas = async (req, res, next) => {
    try {
        const areas = await Area.find();
        res.status(200).json(areas);
    } catch (error) {
        next(error);
    }
};

// Get a single area by ID
const getAreaById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const area = await Area.findById(id);
        if (!area) {
            return res.status(404).json({ message: 'Area not found' });
        }
        res.status(200).json(area);
    } catch (error) {
        next(error);
    }
};

// Update an area by ID
const updateArea = async (req, res, next) => {
    const { id } = req.params;
    const { name, status } = req.body;
    
    try {
        const area = await Area.findByIdAndUpdate(id, { name, status }, { new: true, runValidators: true });
        if (!area) {
            return res.status(404).json({ message: 'Area not found' });
        }
        res.status(200).json(area);
    } catch (error) {
        next(error);
    }
};

// Delete an area by ID
const deleteArea = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const area = await Area.findByIdAndDelete(id);
        if (!area) {
            return res.status(404).json({ message: 'Area not found' });
        }
        res.status(200).json({ message: 'Area deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createArea,
    getAreas,
    getAreaById,
    updateArea,
    deleteArea
};

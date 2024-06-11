const express = require('express');
const {
    createArea,
    getAreas,
    getAreaById,
    updateArea,
    deleteArea
} = require('../controllers/area.controller');

const router = express.Router();

// Create a new area
router.post('/', createArea);

// Get all areas
router.get('/', getAreas);

// Get a single area by ID
router.get('/:id', getAreaById);

// Update an area by ID
router.put('/:id', updateArea);

// Delete an area by ID
router.delete('/:id', deleteArea);

module.exports = router;

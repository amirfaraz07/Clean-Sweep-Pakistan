const express = require('express');
const {
    createSweeper,
    getSweepers,
    getSweeperById,
    updateSweeper,
    deleteSweeper
} = require('../controllers/sweeper.controller');

const router = express.Router();

// Create a new sweeper
router.post('/', createSweeper);

// Get all sweepers
router.get('/', getSweepers);

// Get a single sweeper by ID
router.get('/:id', getSweeperById);

// Update a sweeper by ID
router.put('/:id', updateSweeper);

// Delete a sweeper by ID
router.delete('/:id', deleteSweeper);

module.exports = router;

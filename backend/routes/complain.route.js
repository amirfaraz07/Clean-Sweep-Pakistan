const express = require('express');
const router = express.Router();
const { createComplain } = require('../controllers/complain.controller');

// Route for creating a new complaint
router.post('/', createComplain);

module.exports = router;

const mongoose = require('mongoose');

const sweeperSchema = new mongoose.Schema({
    sweeperId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    numberOfComplaints: {
        type: Number,
        required: true,
        default: 0
    }
});

const Sweeper = mongoose.model('Sweeper', sweeperSchema);

module.exports = Sweeper;

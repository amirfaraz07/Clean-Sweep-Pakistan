const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    areaName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array, // Assuming you'll store the image URL
        required: true,
        trim: true
    }
});

const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;
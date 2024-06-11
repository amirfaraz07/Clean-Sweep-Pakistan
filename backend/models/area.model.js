const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'], // Example status values
        default: 'active'
    }
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;

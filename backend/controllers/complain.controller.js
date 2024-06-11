const Complain = require('../models/complain.model');

// Create a new complain
const createComplain = async (req, res, next) => {
    console.log(req.body);
    const { name, phoneNumber, email, areaName, address, images } = req.body;
    if(!name || !email || !phoneNumber || !areaName || !address || !images ){
        return res.status(400).json({ message : "validation error"})
    }

    try {
        const newComplain = new Complain({ name, phone : phoneNumber, email, areaName, address, images });
        await newComplain.save();
        res.status(201).json({ message: 'Complaint recorded successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComplain
};

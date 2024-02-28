const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin' // Reference the Admin model
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Manager', managerSchema);
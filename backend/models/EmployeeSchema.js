const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin' // Reference the Admin model
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Manager' // Reference the Manager model
    },
    managerName: {
        type: String,
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

module.exports = mongoose.model('Employee', employeeSchema);
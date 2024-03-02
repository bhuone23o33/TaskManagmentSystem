const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin' // Reference the Admin model
    },
    projectName: {
        type: String,
        required: [true, "Please add a project name"]
    },
    projectDescription: {
        type: String,
        required: [true, "Please add a project description"]
    },
    projectRequirements: {
        type: String,
        required: [true, "Please add a project required"]
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Manager' // Reference the Admin model
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Employee' // Reference the Admin model
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    assignedAt: {
        type: Date,
        default: null
    },
    projectDeadline: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Project', ProjectSchema);
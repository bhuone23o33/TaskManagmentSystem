const mongoose = require('mongoose');


// const managerSchema = new mongoose.Schema({
//     managerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Manager'
//     },
//     managerName: {
//         type: String,
//     },
// })
// const employeeSchema = new mongoose.Schema({
//     employeeId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Employee' // Reference the employee model
//     },
//     employeeName: {
//         type: String,
//     },
// })


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
        ref: 'Manager'
    },
    managerName: {
        type: String,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee' // Reference the employee model
    },
    employeeName: {
        type: String,
    },
    status: {
        type: String,
        default: "Not assigned to Manager"
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
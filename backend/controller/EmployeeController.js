const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Employee = require('../models/EmployeeSchema.js');
const Project = require('../models/ProjectSchema.js');



// @desc   login a user
// @route  /api/users
// @access  public 

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if login crendendial are correct or not;
    const employee = await Employee.findOne({ email });
    if (employee && (await bcrypt.compare(password, employee.password))) {
        res.status(200).json({
            token: generateToken(employee._id)
        })
    } else {
        res.status(400);
        throw new Error('Employee does\'t exist!!');
    }
})

// generating token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc   get project
// @route  /api/employee/project/all
// @access  private 
const getProjects = asyncHandler(async (req, res) => {



    // Get user(admin) id 
    const employee = await Employee.findById(req.user.id);

    if (!employee) {
        throw new Error("Employee not Exist");
    }

    const projects = await Project.find({ employeeId: req.user.id });

    res.status(200).json(projects);
})


// @desc   updating Project from Listing
// @route  /api/employee/upManager/:id
// @access  private 
const upProject = asyncHandler(async (req, res) => {
    // delete the user using id in jwt
    // res.send('delete route' + `${req.params.id}`);
    const employee = await Employee.findById(req.user.id);
    if (!employee) {
        res.status(401);
        throw new Error('Employee not found');
    }

    // Find if project doesn't exist
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(400);
        throw new Error('Project does not exist');
    }

    // Extract the update fields from the request body
    const updateFields = {};
    if (req.body.status) updateFields.status = req.body.status;

    // Perform the update
    const updatedProject = await Project.updateOne(
        { _id: req.params.id },
        { $set: updateFields }
    );

    // Check if the update was successful
    if (updatedProject.modifiedCount === 0) {
        res.status(400);
        throw new Error('Failed to update the project');
    }

    res.status(200).json({ message: 'Project updated successfully', data: updatedProject });

})



module.exports = {
    LoginUser,
    getProjects,
    upProject
}
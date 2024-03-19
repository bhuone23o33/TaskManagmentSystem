const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Admin = require('../models/adminSchema.js');
const Manager = require('../models/ManagerSchema.js');
const Employee = require('../models/EmployeeSchema.js');
const Project = require('../models/ProjectSchema.js');
// @desc   Register a employee
// @route  /api/users
// @access  public 

const RegisterEmployee = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // validations
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all information');
    }

    // Get user(manager) id
    const manager = await Manager.findById(req.user.id);

    if (!manager) {
        throw new Error("Manager not found");
    }

    const adminId = manager.adminId;
    const managerName = manager.name;


    // Find if admin already exist
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
        res.status(400);
        throw new Error('Employee already exists');
    }
    // hashPassword
    const salt = await bcrypt.genSalt(10); // gen salt to hash the password
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password

    // create employee
    const employee = await Employee.create({
        adminId,
        managerId: req.user.id,
        managerName,
        name,
        email,
        password: hashedPassword
    })

    if (employee) {
        res.status(201).json({
            token: generateToken(employee._id)
        })
        // res.status(201).json(employee)
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})



// @desc   login a user
// @route  /api/users
// @access  public 

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if login crendendial are correct or not;
    const manager = await Manager.findOne({ email });
    if (manager && (await bcrypt.compare(password, manager.password))) {
        res.status(200).json({
            token: generateToken(manager._id)
        })
        // res.status(200).json(manager);
    } else {
        res.status(400);
        throw new Error('Manager does\'t exist!!');
    }
})

// generating token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc   getting employee Listings
// @route  /api/admin/getEmployee
// @access  private 

const getEmployees = asyncHandler(async (req, res) => {
    // get the manager using id in jwt
    const manager = await Manager.findById(req.user.id);
    if (!manager) {
        res.status(401);
        throw new Error('Manager not found');
    }

    const employees = await Employee.find({ managerId: req.user.id });
    res.status(200).json(employees);
})


// @desc   deleting manager from Listing
// @route  /api/admin/delManager/:id
// @access  private 
const delEmployee = asyncHandler(async (req, res) => {
    // delete the manager using id in jwt

    const manager = await Manager.findById(req.user.id);
    if (!manager) {
        res.status(401);
        throw new Error('Admin not found');
    }

    await Employee.deleteOne({ _id: req.params.id });
    res.status(200).send('Employee Deleted');
})


// @desc   get project
// @route  /api/admin/project/all
// @access  private 
const getProjects = asyncHandler(async (req, res) => {



    // Get user(admin) id 
    const manager = await Manager.findById(req.user.id);

    if (!manager) {
        throw new Error("Manager not Exist");
    }

    const projects = await Project.find({ managerId: req.user.id });

    res.status(200).json(projects);
})


// @desc   updating Project from Listing
// @route  /api/admin/upManager/:id
// @access  private 
const upProject = asyncHandler(async (req, res) => {
    // delete the user using id in jwt
    // res.send('delete route' + `${req.params.id}`);
    const manager = await Manager.findById(req.user.id);
    if (!Manager) {
        res.status(401);
        throw new Error('Manager not found');
    }

    // Find if project doesn't exist
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(400);
        throw new Error('Project does not exist');
    }

    // Extract the update fields from the request body
    const updateFields = {};
    if (req.body.employeeId) updateFields.employeeId = req.body.employeeId;
    if (req.body.employeeName) updateFields.employeeName = req.body.employeeName;
    // if (req.body.assignedAt) updateFields.assignedAt = req.body.assignedAt;
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
    RegisterEmployee,
    LoginUser,
    getEmployees,
    delEmployee,
    getProjects,
    upProject
}
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema.js');
const Manager = require('../models/ManagerSchema.js');
const Project = require('../models/ProjectSchema.js');
// @desc   Register a user(admin)
// @route  /api/users
// @access  public 

const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // validations
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all information');
    }

    // Find if admin already exist
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }
    // hashPassword
    const salt = await bcrypt.genSalt(10); // gen salt to hash the password
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password

    // create admin
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    })

    if (admin) {
        res.status(201).json({
            token: generateToken(admin._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

const RegisterManager = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // validations
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all information');
    }

    // Get user(admin) id 
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
        throw new Error("User not found");
    }


    // Find if admin already exist
    const managerExists = await Manager.findOne({ email });
    if (managerExists) {
        res.status(400);
        throw new Error('manager already exists');
    }
    // hashPassword
    const salt = await bcrypt.genSalt(10); // gen salt to hash the password
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password

    // create manager
    const manager = await Manager.create({
        adminId: req.user.id,
        name,
        email,
        password: hashedPassword
    })

    if (manager) {
        res.status(201).json({
            token: generateToken(manager._id)
        })
        // res.status(201).json(manager)
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
    const admin = await Admin.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.status(200).json({
            token: generateToken(admin._id)
        })
    } else {
        res.status(400);
        throw new Error('Admin does\'t exist!!');
    }
})


// generating token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc   getting managers Listings
// @route  /api/admin/getManagers
// @access  private 

const getManagers = asyncHandler(async (req, res) => {
    // get the user using id in jwt
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
        res.status(401);
        throw new Error('Admin not found');
    }

    const managers = await Manager.find({ adminId: req.user.id });
    res.status(200).json(managers);
})


// @desc   deleting manager from Listing
// @route  /api/admin/delManager/:id
// @access  private 
const deleteManager = asyncHandler(async (req, res) => {
    // delete the user using id in jwt
    // res.send('delete route' + `${req.params.id}`);
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
        res.status(401);
        throw new Error('Admin not found');
    }

    await Manager.deleteOne({ _id: req.params.id });
    res.status(200).send('Manager Deleted');
})

// @desc   create project
// @route  /api/admin/addProject
// @access  private 
const addProject = asyncHandler(async (req, res) => {

    const { projectName, projectDescription, projectRequirements, projectDeadline, managerId, employeeId } = req.body;

    // validations
    if (!projectName || !projectDescription || !projectRequirements || !projectDeadline) {
        res.status(400);
        throw new Error('Please include all information');
    }

    // Get user(admin) id 
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
        throw new Error("User not found");
    }

    // create project
    const project = await Project.create({
        adminId: req.user.id,
        projectName,
        projectDescription,
        projectRequirements,
        projectDeadline,
        managerId,
        employeeId,
    })

    if (project) {
        // res.status(201).json({
        //     token: generateToken(manager._id)
        // })
        res.status(200).send('Successfully Created');
    } else {
        res.status(400);
        throw new Error('Something Went Wrong');
    }
})
// @desc   get project
// @route  /api/admin/project/all
// @access  private 
const getProjects = asyncHandler(async (req, res) => {



    // Get user(admin) id 
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
        throw new Error("User not found");
    }

    const projects = await Project.find({ adminId: req.user.id });

    res.status(200).json(projects);
})



module.exports = {
    RegisterUser,
    RegisterManager,
    LoginUser,
    getManagers,
    deleteManager,
    addProject,
    getProjects
}
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Employee = require('../models/EmployeeSchema.js');



// @desc   login a user
// @route  /api/users
// @access  public 

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if login crendendial are correct or not;
    const employee = await Employee.findOne({ email });
    if (employee && (await bcrypt.compare(password, employee.password))) {
        // res.status(200).json({
        //     token: generateToken(employee._id)
        // })
        res.status(200).json(employee);
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

// @desc   getting admin data
// @route  /api/admin/getProject
// @access  private 

const GetProject = asyncHandler(async (req, res) => {
    res.send('Project Data');
})



module.exports = {
    LoginUser,
    GetProject
}
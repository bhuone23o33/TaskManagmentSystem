const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Manager = require('../models/ManagerSchema.js');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)


            // get user from token
            // const temp = await Manager.findById(decoded.id).select('-password');
            // console.log(temp);
            req.user = await Manager.findById(decoded.id).select('-password');

            next()
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized');
    }
})

module.exports = { protect };
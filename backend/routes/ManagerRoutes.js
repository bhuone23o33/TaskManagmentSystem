const express = require('express');

const router = express.Router();
const { RegisterEmployee, LoginUser, getEmployees, delEmployee, getProjects } = require('../controller/ManagerController.js');
const { protect } = require('../middleware/ManagerMiddleware.js')

router.post('/login', LoginUser);
router.post('/register/employee', protect, RegisterEmployee);
router.get('/getEmployees', protect, getEmployees);
router.delete('/delEmployee/:id', protect, delEmployee);
router.get('/getProject/all', protect, getProjects);

module.exports = router;
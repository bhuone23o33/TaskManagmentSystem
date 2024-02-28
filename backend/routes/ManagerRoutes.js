const express = require('express');

const router = express.Router();
const { RegisterEmployee, LoginUser, GetProject } = require('../controller/ManagerController.js');
const { protect } = require('../middleware/ManagerMiddleware.js')

router.post('/login', LoginUser);
router.post('/register/employee', protect, RegisterEmployee);
router.get('/getMe', protect, GetProject);

module.exports = router;
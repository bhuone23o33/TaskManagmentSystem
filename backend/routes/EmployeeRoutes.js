const express = require('express');

const router = express.Router();
const { LoginUser, GetProject } = require('../controller/EmployeeController.js');
const { protect } = require('../middleware/EmployeeMiddleware.js')

router.post('/login', LoginUser);
router.get('/getMe', protect, GetProject);

module.exports = router;
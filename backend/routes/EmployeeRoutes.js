const express = require('express');

const router = express.Router();
const { LoginUser, getProjects, upProject } = require('../controller/EmployeeController.js');
const { protect } = require('../middleware/EmployeeMiddleware.js')

router.post('/login', LoginUser);
router.get('/project/all', protect, getProjects);
router.put('/upProject/:id', protect, upProject);

module.exports = router;
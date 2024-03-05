const express = require('express');

const router = express.Router();
const { RegisterUser,
    LoginUser,
    getManagers,
    RegisterManager,
    deleteManager,
    addProject,
    getProjects,
    upProject,
    delProject } = require('../controller/adminController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/register/manager', protect, RegisterManager);
router.get('/getManagers', protect, getManagers);
router.delete('/delManager/:id', protect, deleteManager);
router.post('/addProject', protect, addProject);
router.get('/project/all', protect, getProjects);
router.delete('/deProject/:id', protect, delProject);
router.put('/upProject/:id', protect, upProject);


module.exports = router;
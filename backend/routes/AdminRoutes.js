const express = require('express');

const router = express.Router();
const { RegisterUser, LoginUser, getManagers, RegisterManager, deleteManager } = require('../controller/adminController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/register/manager', protect, RegisterManager);
router.get('/getManagers', protect, getManagers);
router.delete('/delManager/:id', protect, deleteManager);

module.exports = router;
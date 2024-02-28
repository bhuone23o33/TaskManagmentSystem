const express = require('express');

const router = express.Router();
const { RegisterUser, LoginUser, GetProject, RegisterManager } = require('../controller/adminController.js');
const { protect } = require('../middleware/authMiddleware.js')

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/register/manager', protect, RegisterManager);
router.get('/getMe', protect, GetProject);

module.exports = router;
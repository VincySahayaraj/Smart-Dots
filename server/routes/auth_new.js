const express = require('express');
const router = express.Router();

const { register, login, logout, adminRegister, isAuth, isAdmin, checktoken, verifytokenMiddleware } = require('../controllers/auth_new');

router.post('/register', register);
router.post('/create/user', verifytokenMiddleware, isAuth, isAdmin, adminRegister);
router.post('/login', login);
router.get('/logout', logout);
router.get('/isAuth',checktoken);

module.exports = router;
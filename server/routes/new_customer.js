const express = require('express');
const router = express.Router();

const {mailTest, CreateNewPassword,userResetPassword,list, updateStatus, adminUpdate, userById, read, updateCustomerId, userUpdate, changePassword,resetPassword } = require('../controllers/new_customer');
const { verifytokenMiddleware,isAuth, isAdmin } = require('../controllers/auth_new');

//router.get('/users', verifytokenMiddleware, isAuth, isAdmin,list);
router.get('/users', list);
router.put('/user/status', verifytokenMiddleware, isAuth, isAdmin, updateStatus);
router.put('/user/update',verifytokenMiddleware, isAuth, isAdmin, adminUpdate);
router.get('/user/:userId',verifytokenMiddleware, isAuth, read);
router.put('/user/update/customerid', verifytokenMiddleware, isAuth, updateCustomerId);
router.put('/user/updateuser',verifytokenMiddleware, isAuth, userUpdate);
router.put('/user/updatepassword',verifytokenMiddleware,isAuth,changePassword);
router.post('/reset-password',resetPassword);
router.get('/reset/:token',userResetPassword);
router.post('/reset/:token',CreateNewPassword)

router.param('userId', userById);

// router.get("/mailTest",mailTest)
module.exports = router;
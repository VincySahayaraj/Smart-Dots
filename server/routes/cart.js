const express = require('express');
const router = express.Router();

const { create,updateUserCart, listUsers, listTempUser, removeTempUser, removeUser, removeCart, updateCart} = require('../controllers/cart');
const { verifytokenMiddleware,isAuth, isAdmin } = require('../controllers/auth_new');

router.post('/cart', create);
router.post('/cart/users', verifytokenMiddleware, isAuth, listUsers);
router.post('/cart/temp/users', listTempUser);
router.post('/cart/temp/remove', removeTempUser);
router.post('/cart/user/remove', removeUser);
router.post('/cart/remove', removeCart);
router.put('/cart/update',updateCart);
router.put('/cart/user/update', updateUserCart);

module.exports = router;
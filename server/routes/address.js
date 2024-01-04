const express = require('express');
const router = express.Router();

const  { addAddress, list} = require('../controllers/address');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');



router.post('/create/address', addAddress);

router.get('/address', list);


module.exports = router;
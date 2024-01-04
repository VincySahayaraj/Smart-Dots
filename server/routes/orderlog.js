const express = require('express');
const router = express.Router();

const {listbyOrdId} = require('../controllers/orderlog');
const {verifytokenMiddleware, isAuth, isAdmin} = require('../controllers/auth_new');

router.post('/order/logs', verifytokenMiddleware, isAuth, isAdmin, listbyOrdId);

module.exports = router;
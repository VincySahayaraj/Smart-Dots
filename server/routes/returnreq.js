const express = require('express');
const router = express.Router();

const {create, list, update, returnReqById, updateByOrderId, readReturn, getReqByOrderId} = require('../controllers/returnreq');
const {verifytokenMiddleware, isAuth, isAdmin} = require('../controllers/auth_new');

router.post('/return/product/create', create);
router.get('/lists/return/requests', verifytokenMiddleware, isAuth, isAdmin, list);
router.put('/return/requests/update/:returnId',verifytokenMiddleware, isAuth, isAdmin, update);
router.put("/return/request/order/status", verifytokenMiddleware, isAuth, isAdmin, updateByOrderId);
router.get('/get/return/request/order/:orderId',verifytokenMiddleware, isAuth, isAdmin,readReturn);
router.param('returnId',returnReqById);
router.param('orderId',getReqByOrderId);

module.exports = router;
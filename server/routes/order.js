const express = require('express');
const router = express.Router();

const {getUserNotes,AddUserNote, read, orderById, getSubOrder, createNewOrder, createUser, getOrderDetails, 
    updateOrderStatus, list, getStatusValues, getAlluserOrders, getRestrictUserOrders, getAdresses,
    getAllAdress, updateCancelledStatus, updateOrderStatusAdmin, getCancelledOrders, getAlluserOrdersAdmin, 
    updateManual, testing, getOrderByUserId} = require('../controllers/order');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');

//router.post('/testing/12345', testing)
router.get('/order/:orderId', verifytokenMiddleware, isAuth, read);
router.post('/create/order', createNewOrder);
router.post('/order/details', getOrderDetails);
router.post('/user/create/order', verifytokenMiddleware, isAuth, createUser);
router.post('/update/order/status', updateOrderStatus);
//router.get('/orders', verifytokenMiddleware, isAuth, isAdmin, list);
router.get('/orders', list);
router.get("/order/status/values", getStatusValues);
router.get('/get/user/orders', verifytokenMiddleware, isAuth, getAlluserOrders);
router.get('/get/your/orders', verifytokenMiddleware, isAuth, getRestrictUserOrders);
router.get('/get/cancelled/orders', verifytokenMiddleware, isAuth, getCancelledOrders);
router.put('/order/update/cancel/status', verifytokenMiddleware, isAuth, updateCancelledStatus);
router.put('/admin/order/update/status', verifytokenMiddleware, isAuth, isAdmin, updateOrderStatusAdmin);
router.post('/order/suborders', verifytokenMiddleware, isAuth, getSubOrder);
router.post('/order/addnote',verifytokenMiddleware,isAuth,AddUserNote);
router.get('/order/notes/:orderId',verifytokenMiddleware,isAuth,getUserNotes);
router.post('/admin/get/all/user/orders', verifytokenMiddleware, isAuth, isAdmin, getAlluserOrdersAdmin);

router.post('/order/manual/shipping', verifytokenMiddleware, isAuth, isAdmin, updateManual);

// shipping adress routes
router.get('/order/shipping/alladress',verifytokenMiddleware,getAllAdress);
router.get('/order/shipping/adresses',verifytokenMiddleware,getAdresses);

//get order details for userid
router.post('/order/userid', getOrderByUserId);

router.param('orderId', orderById);
module.exports = router;
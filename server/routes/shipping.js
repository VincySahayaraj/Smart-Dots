const express = require('express');
const router = express.Router();

const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');
const {read,Bookshipment, shippingById, update, updateStatus, getShippingByUserId, getShipment, updateShipment,updateShipment1, updatePickupId, create, checkMiles,getRates} =require('../controllers/shipping');

router.get('/shipping/:shippingId', read);
router.put('/shipping/:shippingId',verifytokenMiddleware,isAuth,update)
router.put('/shipping/status/:shippingId', verifytokenMiddleware, isAuth, updateStatus);
//router.post('/user/shipping/address', verifytokenMiddleware, isAuth, getShippingByUserId);
router.post('/user/shipping/address', getShippingByUserId);
router.post('/get/shipment-details/orderid', verifytokenMiddleware, isAuth, isAdmin, getShipment);
router.put('/update/shipment/details',verifytokenMiddleware,isAuth,isAdmin,updateShipment);
router.put('/update/shipment/details1',verifytokenMiddleware,isAuth,isAdmin,updateShipment1);
router.put('/shipment/update/pickup',verifytokenMiddleware,isAuth,isAdmin,updatePickupId);
router.post('/create/shipping', create);
router.post('/check/miles', checkMiles);

//Route for retrieving the new shipping rates from worldwide express
router.post('/shipping/rates',verifytokenMiddleware,isAuth,isAdmin,getRates);
//label
router.post('/shipping/label',verifytokenMiddleware,isAuth,isAdmin,Bookshipment)

router.param('shippingId', shippingById);


module.exports = router;

const express = require('express');
const router = express.Router();

const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');
const { create, list, couponById, update, read, couponCheck, newUserCouponCheck, getCouponLogsByCouponId, couponLoglist, getCouponByOrderId, updateCouponStatus } = require('../controllers/coupon');

router.get('/coupon/lists', list);
router.post('/coupon/create', verifytokenMiddleware, isAuth, isAdmin, create);
router.put('/coupon/update/:couponId', verifytokenMiddleware, isAuth, isAdmin, update);
router.get('/coupon/:couponId', read);
router.post('/check/coupon', verifytokenMiddleware, isAuth, couponCheck);
router.post('/check/new-user/coupon', newUserCouponCheck);
router.post('/get/coupon-logs/list', verifytokenMiddleware, isAuth, isAdmin, getCouponLogsByCouponId)
router.get('/coupon/logs/lists', couponLoglist);
router.post('/get/coupon/list/order', verifytokenMiddleware, isAuth, isAdmin, getCouponByOrderId);

router.post('/coupon/update/status', verifytokenMiddleware, isAuth, isAdmin, updateCouponStatus)
router.param('couponId', couponById);

module.exports = router;
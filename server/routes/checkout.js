const express = require("express");
const router = express.Router();
require("dotenv").config();

const { createCustomer, createCardWallet, chargePayment, removeCard, getPaymentMethod, createRefund, getRefund, retrieveRefund } = require('../controllers/checkout');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');

router.post('/create-customer', verifytokenMiddleware, isAuth, createCustomer);
router.post('/card-wallet', verifytokenMiddleware, isAuth, createCardWallet);
router.post('/charge-payment-intent', verifytokenMiddleware, isAuth, chargePayment);
router.post('/detach/payment/method', verifytokenMiddleware, isAuth, removeCard);
router.post('/get/payment-method/id', verifytokenMiddleware, isAuth, getPaymentMethod);
router.post('/refund', verifytokenMiddleware, isAuth, createRefund);
router.post('/get-refund', verifytokenMiddleware, isAuth, getRefund);
router.post('/retrieve-refund', verifytokenMiddleware, isAuth, retrieveRefund);

module.exports = router;
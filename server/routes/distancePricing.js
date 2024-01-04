const express = require('express');
const router = express.Router();

const  { addDistancePricing} = require('../controllers/distancePricing');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');

router.post('/create/distancePricing', addDistancePricing);

module.exports = router;
const express = require('express');
const router = express.Router();

const { listByProdId, create } = require('../controllers/invHistory');
const { verifytokenMiddleware,isAuth, isAdmin } = require('../controllers/auth_new');

router.post('/inventory/history', verifytokenMiddleware, isAuth, isAdmin, listByProdId);
router.post('/create/inventory/history', verifytokenMiddleware, isAuth, isAdmin, create);

module.exports = router;
const express = require('express');
const router = express.Router();

const { create, listCardDetailsById, updateStatus, lists, listActiveCardById } = require('../controllers/cardDetail');
const { verifytokenMiddleware,isAuth, isAdmin } = require('../controllers/auth_new');

router.post('/create/card-detail',verifytokenMiddleware, isAuth, create);
router.post('/list/card/details', verifytokenMiddleware, isAuth, listCardDetailsById);
router.put('/update/card/status', verifytokenMiddleware, isAuth, updateStatus);
router.post('/list/active/cards', verifytokenMiddleware, isAuth, listActiveCardById);
router.get('/list/cards',lists);

module.exports = router;
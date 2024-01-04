const express = require('express');
const router = express.Router();

const { create, supplierById, read,update, list, remove, checkSupplier } = require('../controllers/supplier')
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');

router.get('/supplier/:supplierId', verifytokenMiddleware, isAuth, isAdmin,read);
router.post('/supplier', verifytokenMiddleware, isAuth, isAdmin, create);
router.put('/supplier/:supplierId', verifytokenMiddleware, isAuth, isAdmin, update);
router.delete('/supplier/:supplierId', verifytokenMiddleware, isAuth, isAdmin, remove);
router.get('/suppliers', verifytokenMiddleware, isAuth, isAdmin,list);
router.post('/check/supplier', checkSupplier);

router.param('supplierId', supplierById);

module.exports = router;
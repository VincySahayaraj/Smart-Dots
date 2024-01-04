const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list, checkCategory, removeStatus, listforProd, listAll } = require('../controllers/category');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');

router.get('/category/:categoryId', verifytokenMiddleware, isAuth, isAdmin, read);
router.post('/category', verifytokenMiddleware, isAuth, isAdmin, create);
router.put('/category/:categoryId', verifytokenMiddleware, isAuth, isAdmin, update);
router.delete('/category/:categoryId', verifytokenMiddleware, isAuth, isAdmin, remove);
router.get('/categories', verifytokenMiddleware, isAuth, isAdmin, list);
router.post('/check/category', checkCategory);
router.put('/remove/category', verifytokenMiddleware, isAuth, isAdmin, removeStatus);
router.get('/store/categories', listforProd);
router.get('/all/categories', verifytokenMiddleware, isAuth, isAdmin, listAll);

router.param('categoryId', categoryById);

module.exports = router;

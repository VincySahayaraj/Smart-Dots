const express = require('express');
const router = express.Router();
const fileupload = require("express-fileupload");
const { create, getProducts, itemById, read, photo, update, remove, updateStatus, listSmartDotsProducts, listSmartDotsProductsAdmin, addToSmartDot, listMasterProducts, getProductsByCategory, imageUpload } = require('../controllers/item');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');
const { s3FileUpload, galleryUpload } = require("../utils/fileUpload")

router.post('/product', verifytokenMiddleware, isAuth, isAdmin, create);
router.get('/products', listSmartDotsProducts);
router.get('/products/admin', verifytokenMiddleware, isAuth, isAdmin, listSmartDotsProductsAdmin);
router.get('/master-products', verifytokenMiddleware, isAuth, isAdmin, listMasterProducts)
router.get('/product/:productId', read);
router.get('/product/photo/:productId', photo);
router.put('/product/:productId', verifytokenMiddleware, isAuth, isAdmin, update);
router.put('/remove/product', verifytokenMiddleware, isAuth, isAdmin, remove);
//router.put('/update/item/status/demo', updateStatus);
router.get('/products/old/smartdots', verifytokenMiddleware, isAuth, isAdmin, getProducts);
router.put('/add/item/smart-dots', verifytokenMiddleware, isAuth, isAdmin, addToSmartDot);
router.post('/get/product/category', getProductsByCategory);

router.param('productId', itemById);

//router.get('/products/:productId', itemById)


// new product create route for file upload aws

router.post('/admin/upload/image', fileupload(), s3FileUpload)

router.post('/admin/upload/gallery', fileupload(), galleryUpload)

module.exports = router;
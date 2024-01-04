const express = require('express');
const router = express.Router();

const { contactById, read, create, remove, list } = require("../controllers/contact");
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');

router.get('/contact/:contactId', verifytokenMiddleware, isAuth, isAdmin, read);
router.post('/contact', create);
router.delete('/contact/:contactId', verifytokenMiddleware, isAuth, isAdmin, remove);
router.get('/contacts', verifytokenMiddleware, isAuth, isAdmin, list);

router.param('contactId', contactById);

module.exports = router;
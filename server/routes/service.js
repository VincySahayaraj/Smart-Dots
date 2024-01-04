const express = require('express');
const router = express.Router();

const  { addService, list,serviceById,read,update,changeServiceStatus} = require('../controllers/service');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');

router.post('/create/service', addService);

router.get('/services', list);

router.get('/services/serviceId/:serviceId', read);

router.put('/services/update/:serviceId', update);

router.param('serviceId', serviceById);

router.put('/services/changeStatus', changeServiceStatus);

module.exports = router;
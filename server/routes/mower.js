const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());    

const  { createMower,getMowerByMowerId,mowerById ,read,list,update,getMowerListForUser,mowerByUserId} = require('../controllers/mower');
const { verifytokenMiddleware, isAuth, isAdmin } = require('../controllers/auth_new');



router.post('/create/mower', createMower);
//router.post('/create/mower', verifytokenMiddleware, isAuth, createMower);
//router.get('/mowers', verifytokenMiddleware, isAuth,list);
router.get('/mowers', list);
router.get('/mowers/userId/:userId', getMowerListForUser);
router.post('/mower/mowerId', getMowerByMowerId);
router.get('/mowers/mowerId/:mowerId', read);
router.put('/mower/update/:mowerId', update);
// const {list} = require('../controllers/mower');
// const { verifytokenMiddleware,isAuth, isAdmin } = require('../controllers/auth_new');

// router.get('/mowers', verifytokenMiddleware, isAuth, isAdmin,list);

router.param('mowerId', mowerById);

router.param('userId', mowerByUserId);

module.exports = router;
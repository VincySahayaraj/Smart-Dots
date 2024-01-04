const express = require('express');
const router = express.Router();

/* router.post('/register', register);
router.post('/create/user', verifytokenMiddleware, isAuth, isAdmin, adminRegister);
router.post('/login', login);
router.get('/logout', logout);
router.get('/isAuth',checktoken); */

router.get('/testing', (req,res) => {
    try {
        return res.send("Welcome from Smartdots dev")
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send("Something went wrong")
    }
})

router.get('/', (req,res) => {
    try {
        return res.send("Welcome from Smartdots Team")
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send("Something went wrong")
    }
})

module.exports = router;
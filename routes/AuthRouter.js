const express = require('express');
const { registerNewUser, loginUser } = require('../controllers/AuthController');
const { checkEmailUnique } = require('../middlewares/checkEmailUnique');
const { validateRegister, validateLogin } = require('../middlewares/validate');
const router = express.Router();

/* register endpoint */
router.post('/register',validateRegister, checkEmailUnique, registerNewUser );

//login

router.post(`/login`, validateLogin,loginUser)

module.exports = router;

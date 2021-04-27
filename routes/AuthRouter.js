const express = require('express');
const { registerNewUser } = require('../controllers/AuthController');
const { checkEmailUnique } = require('../middlewares/checkEmailUnique');
const { validateRegister } = require('../middlewares/validate');
const router = express.Router();

/* GET users listing. */
router.post('/register',validateRegister, checkEmailUnique, registerNewUser );

module.exports = router;

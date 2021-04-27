const express = require('express');
const { verify } = require('jsonwebtoken');
const { indexView, homeInfo } = require('../controllers/IndexController');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

/* GET home page. */
router.get('/',indexView);



router.get('/favicon.ico', function(req, res, next) {
  res.status(204).end();
});


router.post("/",verifyToken,homeInfo ) 

module.exports = router;

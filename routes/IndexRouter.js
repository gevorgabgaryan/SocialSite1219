const express = require('express');
const { verify } = require('jsonwebtoken');
const { indexView, homeInfo, profileView, changePhoto } = require('../controllers/IndexController');
const { verifyToken } = require('../middlewares/auth');
const { upload, imageResizer } = require('../middlewares/upload');
const router = express.Router();

/* GET home page. */
router.get('/',indexView);



router.get('/favicon.ico', function(req, res, next) {
  res.status(204).end();
});


router.post("/",verifyToken,homeInfo ) ;

/**
 * displaying profile page using ID*/

router.get("/profile/:id", profileView) 


//change Photo

router.post("/changePhoto",verifyToken, upload,imageResizer, changePhoto) ;

module.exports = router;

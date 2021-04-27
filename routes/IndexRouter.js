const express = require('express');
const { indexView } = require('../controllers/IndexController');
const router = express.Router();

/* GET home page. */
router.get('/',indexView);



router.get('/favicon.ico', function(req, res, next) {
  res.status(204).end();
});
module.exports = router;

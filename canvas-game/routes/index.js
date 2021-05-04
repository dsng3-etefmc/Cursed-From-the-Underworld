var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.header("Content-Type", "text/html");
  res.sendFile(path.join(__dirname + '/../app/index.html'))
});

module.exports = router;


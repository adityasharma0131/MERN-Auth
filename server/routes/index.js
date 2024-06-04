var express = require('express');
var router = express.Router();
const User = require("./DB");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: "API is working"
  });
});


module.exports = router;

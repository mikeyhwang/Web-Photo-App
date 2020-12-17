var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //next(new Error('test'));
  res.render('index',{name:"Yunhao (Mike)"});
});

router.get('/login',(req, res, next) => {
  res.render("login", {title:"Log In"});
});

router.get('/registration',(req, res, next) => {
  res.render("registration", {title:"Register Here"});
});

router.get('/postimage',(req, res, next) => {
  res.render("postimage", {title:"Post Image Here"});
});

router.get('/imagepost',(req, res, next) => {
  res.render("imagepost", {title:"Image Posted Here"});
})
module.exports = router;

var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postmiddleware');
var db = require("../config/database");

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  //next(new Error('test'));
  res.render('index',{name:"Yunhao (Mike)"});
});

router.get('/login',(req, res, next) => {
  res.render("login", {title:"Log In"});
});

router.get('/registration',(req, res, next) => {
  res.render("registration", {title:"Register Here"});
});

router.use('/postimage', isLoggedIn);
router.get('/postimage',(req, res, next) => {
  res.render("postimage", {title:"Post Image Here"});
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
  res.render('imagepost', {title: `Post ${req.params.id}`});
});



module.exports = router;

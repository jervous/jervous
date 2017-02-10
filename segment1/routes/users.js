var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/all', function(req, res, next) {
  res.send('respond with a all');
});

router.all('/', function(req, res, next) {
  res.send('');
});*/
router.all('/login', function(req, res, next) {
  subflag=req.body['subflag']
  if(subflag==undefined){  //没有提交登录请求
    res.render('login',{})  //渲染login.ejs页面
  }else{
    userModel.login(req,res)
  }
});

router.get('/zhuce', function(req, res, next) {
  nicheng=req.query['nicheng'];
  console.log(nicheng)
  res.send('注册')
});
router.post('/zhuce', function(req, res, next) {
  nicheng=req.body['nicheng'];
  console.log('aa'+nicheng)
  userModel.zhuce(req,res)
});


module.exports = router;

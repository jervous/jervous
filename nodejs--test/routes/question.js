var express = require('express');
var router = express.Router();
var check=require('../jsb/checkSession')
var questionModel=require('../models/questionModel')
router.all('/ask', function(req, res) {
    loginbean=check.check(req,res)
   if(!loginbean){
       return;
   }
    subflag = req.body['subflag'];
    if(subflag==undefined){
        res.render('ask', {loginbean: loginbean});
    }else{
        //发提问
        questionModel.ask(req,res);
    }
})

module.exports = router;
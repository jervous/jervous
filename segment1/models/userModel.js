var connPool = require("./ConnPool");
var loginbean = require("../jsb/LoginBean");
module.exports={
    zhuce:function(req,res){
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            var userAddSql = 'insert into user (email,pwd,nicheng,createtime) values(?,?,?,current_timestamp)';
            var param = [req.body['email'],req.body['pwd'],req.body['nicheng']];
            conn.query(userAddSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    // res.send("数据库错误,错误原因:"+err.message);
                    // return;
                    //判断  输出错误
                    errStr=err.message;
                    sendStr="<script>"
                    if(errStr.indexOf('emailuniq')>-1){
                        sendStr+='alert("email出错");'
                    }else if(errStr.indexOf('nichenguiq')>-1){
                        sendStr+='alert("昵称出错");'
                    }else{
                        sendStr+='alert("服务器出错");'
                    }
                    sendStr+="history.back();</script>"
                    console.log(sendStr)
                    res.send(sendStr);

                    return;
                }
                //res.send('注册成功');
                res.redirect(307,'./login');//跳转到login
            })
            conn.release();
        });
    },
    login:function(req,res){
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn) {
            if (err) {
                res.send('数据库连接错误,错误原因:' + err.message)
                return;
            }
            var userSql = 'select uid,nicheng from user where email=? and pwd=?';  //从mysql选择
            var param = [req.body['email'],req.body['pwd']]; //从login获取昵称  密码
            conn.query(userSql,param,function(err,rs) {
                if (err) {
                    res.send('数据库连接错误,错误原因:' + err.message)
                    return;
                }
                console.log(rs)
                if(rs.length>0){  //从mysql获取userSql,>0就是能找到相对于的信息
                    loginbean = new loginbean()
                    loginbean.id=rs[0].uid;
                    loginbean.nicheng=rs[0].nicheng;
                    req.session.loginbean=loginbean
                    res.redirect('/');    //跳转回index页

                   // res.send('登录成功')
                }else{
                    res.send('email/密码错误')
                }
            })
            conn.release();//把连接放回连接池

        })

    }
}
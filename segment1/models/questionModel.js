var connPool = require("./ConnPool");
module.exports={
    ask:function(req,res){
        loginbean = req.session.loginbean;
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            if(err){
                res.send(err.message)
            }
            var userAddSql = 'insert into question (typeid,title,content,uid,createtime) values(?,?,?,?,current_timestamp)';
            var param = [req.body['typeid'],req.body['title'],req.body['content'],loginbean.id];
            conn.query(userAddSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    res.send("数据库错误,错误原因:"+err.message);
                    return;
                }
                res.send('<script>alert("提问成功");location.href="../";</script>');
               // res.redirect('../');
            })
            conn.release();
        });
    },
    queList:function (req,res,loginbean) {
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn)
        {
            if(err)
            {
                //console.log('insert err:',err.message);
                res.send("获取连接错误,错误原因:"+err.message);
                return;
            }
            var listSql = 'select qid,title,looknum,renum,finished,updtime,createtime from question order by qid desc';
            var param = [];
            conn.query(listSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    res.send("数据库错误,错误原因:"+err.message);
                    return;
                }
                //console.log(rs);
                //console.log(rs.length);
                res.render('index', {loginbean:loginbean,rs:rs});
            })
            conn.release();
        });
    }

}
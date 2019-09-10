<?php
//连接数据库
require "conn.php";



if(isset($_GET['username'])){
  //存在的话就取出用户名
  $name=$_GET['username'];

  //通过查询的方式检测是否存在用户名
  $result=$conn->query("select * from user where username='$name'");
  if( $result->fetch_assoc()){//存在
   echo true; 
  }else{//不存在
    echo false;
   //先接收用户点击的值
if(isset($_GET['username']) && isset($_GET['password'])){
  $name=$_GET['username'];
  $pass=$_GET['password'];
  //添加数据库
  $conn->query("insert into user values('$name','$pass', null)");
  header('http://10.31.151.36:8088/Netease%20Cloud/src/html/inde.html');
}else{
exit('非法操作');//退出，并打印里面的内容。
}
  }

}
 



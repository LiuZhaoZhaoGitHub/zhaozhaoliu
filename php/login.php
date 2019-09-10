<?php
require "conn.php";
header('Access-Control-Allow-Origin:*');

if(isset($_GET['username'])){//前端ajax传输过来的额
	$username=$_GET['username'];
	$password=($_GET['userpass']);
}else{
	exit('非法操作');
}

$query="select * from user where username='$username' and password='$password'";
$result=$conn->query($query);
 

if($result->fetch_assoc()){//存在   

    echo true;
  }else{//不存在
    echo false;
  }





	
	

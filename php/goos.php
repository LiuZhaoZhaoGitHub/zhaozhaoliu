<?php  
	header('content-type:text/html;charset=utf-8');//设置字符编码
	require "conn.php";
	header('Access-Control-Allow-Origin:*');
	
	if(isset($_GET['sid'])){ //先判断是否存在
		$id=$_GET['sid'];
		$result=$conn->query("select * from cloudpic where sid=$id ");
	
		$wronglist=$result->fetch_assoc();
		
		echo json_encode($wronglist);

	} 
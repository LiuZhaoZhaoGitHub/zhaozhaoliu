<?php  
	header('content-type:text/html;charset=utf-8');//设置字符编码
	include "conn.php";
	header('Access-Control-Allow-Origin:*');

	$result=$conn->query("select * from lunbopic");
	
	$wronglist=array();
	for ($i=0; $i < $result->num_rows; $i++) { 
		$wronglist[$i]=$result->fetch_assoc();
	}

	echo json_encode($wronglist);

?>
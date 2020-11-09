<?php
   // define('DB_SERVER', 'localhost:3036');
   // define('DB_USERNAME', 'root');
   // define('DB_PASSWORD', 'rootpassword');
   // define('DB_DATABASE', 'database');
   // $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

   // if($_SERVER["REQUEST_METHOD"] == "POST") {      
   //    $myusername = mysqli_real_escape_string($db,$_POST['user_email']);
   //    $mypassword = mysqli_real_escape_string($db,$_POST['user_password']); 
      
   //    $sql = "SELECT id FROM admin WHERE username = '$myusername' and passcode = '$mypassword'";
   //    $result = mysqli_query($db,$sql);
   //    $row = mysqli_fetch_array($result,MYSQLI_ASSOC);    
   //    $count = mysqli_num_rows($result);
   //    if($count == 1) {
	// 	echo json_encode(array('status' => '1', 'data'=> array('user_id' => $row['user_id']))); 
   //    }else {
   //    	echo json_encode(array('status' => '0')); 
   //    }
   // }
   echo json_encode(array('status' => '1', 'data'=> array('user_id' => 1))); 

?>
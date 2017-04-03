<?php
	$user = 'root';
	$pass = '';
	$dbName = 'spritelink';
	
	$connection = new mysqli('localhost', $user, $pass, $dbName);
	if ($connection->connect_error) {
    die("Error: Unable To Connect" . $connection->connect_error);
	}
	$name = $_POST["name"];
	$name = stripslashes($name); // Anti-SQL Injection Measure
	$name = mysql_real_escape_string($name); // Anti-SQL Injection Measure
	$pass = $_POST["pass"];
	$pass = stripslashes($pass);
	$pass = mysql_real_escape_string($pass);
	
	$query = "SELECT * FROM customer WHERE username='$name' and password='$pass'";
	$result = mysqli_query($connection, $query);//MAKE SURE TO USE MSQLi from now on
	
	$count = mysqli_num_rows($result);
	
	if($count==1) {
		echo "Login Success!";
	}
	else {
		echo "Login Failed YOU FOOL!!!!";
	}

	/*if($query = $connection->prepare("SELECT username, password FROM customer WHERE username = ? AND password = ?;")) {
		$query->bind_param("ss", $name, $pass);
		
		$query->execute();
		echo "Login Success!";
		$query->close();
	}
	else {
		echo "Failed to Login.";
	}*/
	
	
	$connection->close();
?>
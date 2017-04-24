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
	$name = mysqli_real_escape_string($connection, $name); // Anti-SQL Injection Measure
	$pass = $_POST["pass"];
	$pass = stripslashes($pass);
	$pass = mysqli_real_escape_string($connection, $pass);
	
	$query = "SELECT * FROM customer WHERE username='$name' and password='$pass'";
	$result = mysqli_query($connection, $query);//MAKE SURE TO USE MSQLi from now on
	
	$count = mysqli_num_rows($result);
	
	if($count==1) {
		echo "Login Success!";
		$row = mysqli_fetch_assoc($result);
		session_start();
		$_SESSION["id"] = $row["customer_id"];
		header("location: dashboard.php");
	}
	else {
		header("location: login.html");
		echo "Login Failed";
	}
?>

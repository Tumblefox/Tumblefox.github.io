<?php
	$user = 'root';
	$pass = '';
	$dbName = 'spritelink';
	
	$connection = new mysqli('localhost', $user, $pass, $dbName);
	if ($connection->connect_error) {
    die("Error: Unable To Connect" . $connection->connect_error);
	} 
	
	session_start();
	$id = $_SESSION["id"];
	
	function getName() {
	
		$result = mysqli_query($connection, "SELECT username from customer WHERE customer_id = $id");
		$row = mysqli_fetch_assoc($result);
		$msg = $row["username"];
		echo "$msg";
	}
	
	function getCardImage() {
		$query = "SELECT * FROM freelancer WHERE username='$name' and password='$pass'";
	}
	
	function getCardContact() {
	}
	
	function getCardRating() {
	}
	
	
	
	//https://www.w3schools.com/php/php_functions.asp for functions
	//http://stackoverflow.com/questions/34381598/how-to-put-php-variables-in-div-tag-layers insert php in html
?>
<?php
	user = 'root';
	$pass = '';
	$dbName = 'spritelink';
	
	$connection = new mysqli('localhost', $user, $pass, $dbName);
	if ($connection->connect_error) {
    die("Error: Unable To Connect" . $connection->connect_error);
	} 
	
	session_start();
	include 'login.php';
	$_SESSION['login_user']= $name;
?>
<?php
	user = 'root';
	$pass = '';
	$dbName = 'spritelink';
	
	$connection = new mysqli('localhost', $user, $pass, $dbName);
	if ($connection->connect_error) {
    die("Error: Unable To Connect" . $connection->connect_error);
	} 
	
	include 'loggedin.php';
	
	function getCardImage() {
	}
	
	function getCardContact() {
	}
	
	function getCardRating() {
	}
	
	
	
	//https://www.w3schools.com/php/php_functions.asp for functions
	//http://stackoverflow.com/questions/34381598/how-to-put-php-variables-in-div-tag-layers insert php in html
?>
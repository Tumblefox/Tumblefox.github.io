<?php
	$user = 'root';
	$pass = '';
	$dbName = 'spritelink';
	
	$connection = new mysqli('localhost', $user, $pass, $dbName);
	if ($connection->connect_error) {
    die("Error: Unable To Connect" . $connection->connect_error);
	} 
	
	if ($query = $connection->prepare("INSERT INTO customer (fname, lname, email, username, password, address, zip, phone, card_num, csv, exp_date, bitcoin_send, bitcoin_recieve, paypal_email, paypal_pass)
	VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);")) {
		$query->bind_param("ssssssiiiisssss", $fname, $lname, $email, $uname, $pass, $address, $zip, $number, $card, $csv, $xdate, $btcSend, $btcR, $pp, $ppPass);
		
		$fname = $_POST["fname"];
		$lname = $_POST["lname"];
		$email = $_POST["email"];
		$uname = $_POST["username"];
		$pass = $_POST["password"];
		$address = $_POST["address"];
		$zip = $_POST["zip"];
		$number = $_POST["number"];
		$card = $_POST["card"];
		$csv = $_POST["csv"];
		$xdate = $_POST["cardExDate"];
		$btcSend = $_POST["btcSend"];
		$btcR = $_POST["btcRecieve"];
		$pp = $_POST["paypal"];
		$ppPass = $_POST["paypalPass"];
		
		$query->execute();
		$query->close();
	}
	
	else {
		echo "Failed to Sign Up.";
	}
	
	$connection->close();
?>
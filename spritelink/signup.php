<?php
	$user = 'root';
	$pass = '';
	$dbName = 'spritelink';
	
	$connection = new mysqli('localhost', $user, $pass, $dbName);
	if ($connection->connect_error) {
    die("Error: Unable To Connect" . $connection->connect_error);
	} 
	
	if ($query = $connection->prepare("INSERT INTO customer (customer_id, fname, lname, email, username, password, address, zip, phone, freelance, card_num, csv, exp_date, bitcoin_send, bitcoin_receive, paypal_email, paypal_pass, card1, card2, card3)
	VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);")) {
		$query->bind_param("issssssiisiiisssssss", $id, $fname, $lname, $email, $uname, $pass, $address, $zip, $number, $freelance, $card, $csv, $xdate, $btcSend, $btcR, $pp, $ppPass, $card1, $card2, $card3);
		
		$id = "null";
		$fname = $_POST["fname"];
		$lname = $_POST["lname"];
		$email = $_POST["email"];
		$uname = $_POST["username"];
		$pass = $_POST["password"];
		$address = $_POST["address"];
		$zip = $_POST["zip"];
		$number = $_POST["number"];
		$freelance = $_POST["freelance"];
		$card = $_POST["card"];
		$csv = $_POST["csv"];
		$xdate = $_POST["cardExDate"];
		$btcSend = $_POST["btcSend"];
		$btcR = $_POST["btcRecieve"];
		$pp = $_POST["paypal"];
		$ppPass = $_POST["paypalPass"];
		$card1 = "null";
		$card2 = "null";
		$card3 = "null";
		
		if ($freelance == "yes") {
			if ($freeQuery = $connection->prepare("INSERT INTO freelancer (businessname, category, website, socialMedia)
			VALUES (?, ?, ?, ?)")) {
				$freeQuery->bind_param("ssss", $business, $category, $website, $sm);
				$business =
			}
		}
		
		$query->execute();
		$query->close();
	}
	
	else {
		echo "Failed to Sign Up.";
		echo mysqli_error($connection);
	}
	header("location: dashboard.html");
	$connection->close();
?>
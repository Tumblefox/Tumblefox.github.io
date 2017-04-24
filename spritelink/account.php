<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="stylesheet" href="index.css"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel=icon href="img/favicon/favicon-96x96.png"/>
	</head>
	
	<title>My Account</title>
	
	<div class="faq">
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
				$result = mysqli_query($connection, "SELECT * from customer WHERE customer_id = $id");
				$row = mysqli_fetch_assoc($result);
				$fname = $row["fname"];
				$lname = $row["lname"];
				$email = $row["email"];
				$phone = $row["phone"];
				$address = $row["address"];
				$zip = $row["zip"];
				$ppemail = $row["paypal_email"];
				$card = $row["card_num"];
				$btcR = $row["bitcoin_receive"];
				echo "<p>Name: $fname $lname<br>
				Email: $email<br>
				Phone: $phone<br>
				Address: $address, $zip<br>
				Paypal Email: $ppemail<br>
				Card: $card<br>
				Bitcoin Recieve Address: $btcR</p>";
		?>
	</div>
	
	<div>
	</div>
</html>
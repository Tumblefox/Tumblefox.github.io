<!DOCTYPE html>

<html lang="en">

	<head>
		<link rel="stylesheet" href="index.css"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel=icon href="img/favicon/favicon-96x96.png"/>
	</head>

	<title>Dashboard</title>

	<body>
		<div class="sideMenu">
			<div id="lancerStats">
				<p>Rank: </p>
				<p>Jobs Completed: </p>
				<p>Quality Rating: </p>
				<p>Value Rating: </p><br>
				<p>Earnings: </p>
				<p>Percentage of Refunds: </p>
				<p>Percentage of Total Jobs: </p><br>
				<p>Number of Times Your Card Was Picked Up: </p>
				<p>Percentage of Times Your Card Led to a Job: </p>
				<p>Percentage Customers Who Would Hire You Again: </p><br>
				
				
			</div>
		</div>
	
		<div class="navbar" id="nav">
			<div class="profilePic" onclick="accountTab()">
				<center><img src="img/icons/profile.svg"/></center>
				<!--Make this clickable. Include: (1)My Account, (2)Logout. Add PHP to show user's profile pic -->
			</div>
			<input type="text" name="search" placeholder="Search">
			<a href="search.html" style="float: right;">Go</a>
		</div>
		
		<div id="acc" onclick="closeAccTab()">
			<?php  
			$user = 'root';
			$pass = '';
			$dbName = 'spritelink';
			$connection = new mysqli('localhost', $user, $pass, $dbName);
			if ($connection->connect_error) {
				die("Error: Unable To Connect" . $connection->connect_error);
				} 
				session_start(); $id = $_SESSION["id"]; 
				$result = mysqli_query($connection, "SELECT * from customer WHERE customer_id = $id");
				$row = mysqli_fetch_assoc($result);
				$fResult = mysqli_query($connection, "SELECT * from freelancer WHERE customer_id = $id");
				$fRow = mysqli_fetch_assoc($fResult);
				
				$msg = $row["username"];
				echo "<p>Hey, $msg</p>";
			?>
			<a href="account.php"><p>Account</p></a>
			<a href="index.html"><p>Logout</p></a>
		</div>
		
		<?php
		$freelance = $row["freelance"];
		$card1 = $row["card1"];
		$card2 = $row["card2"];
		$card3 = $row["card3"];
		$phone = $row["phone"];
		$img = $fRow["businessImageLink"];
		$bname = $fRow["businessname"];
		$site = $fRow["website"];
		$sm = $fRow["socialMedia"];
		$qrating = $fRow["qrating"]; if ($qrating == null) {$qrating = 0;}
		$vrating = $fRow["vrating"]; if ($vrating == null) {$vrating = 0;}
		if ($freelance == "yes")
			echo "<div class='card'>
			<!--Look into JCROP to allow users to crop their images before they upload-->
					<div class='cardContent' id='editable' onclick='editImage()'>
						<h1 id='change'>Change/Add Image</h1>
						<form action='' method='POST' id='edit' style='display: none; position: absolute; top: 50%; left 0'>
							Link <input type='text' name='link' placeholder=$img />
							<button type='submit' class='button'>Submit</button>
						</form>
						<img src=$img />
					</div>
					
					<div class='cardContact'>
						<p>$bname<br>
						$site<br>
						$sm<br>
						$phone</p>
					</div>
					
					<div class='cardRating'>
						<p>$qrating<br>
						$vrating</p>
					</div>
			</div>";
		else {
			if ($card1 != null)
			echo "<div class='card' id='editable'>
			<h1 align='center'>Card 1</h1>
			<!--Look into JCROP to allow users to crop their images before they upload-->
					<div class='cardContent'>
						<!--PHP script-->
					</div>
					
					<div class='cardContact'>
						<!--PHP script-->
					</div>
					
					<div class='cardRating'>
						<!--PHP script-->
					</div>
			</div>";
			if ($card2 != null)
			echo "<div class='card' id='editable'>
			<h1 align='center'>Card 2</h1>
			<!--Look into JCROP to allow users to crop their images before they upload-->
					<div class='cardContent'>
						<!--PHP script-->
					</div>
					
					<div class='cardContact'>
						<!--PHP script-->
					</div>
					
					<div class='cardRating'>
						<!--PHP script-->
					</div>
			</div>";
			if ($card3 != null)
			echo "<div class='card' id='editable'>
			<h1 align='center'>Card 3</h1>
			<!--Look into JCROP to allow users to crop their images before they upload-->
					<div class='cardContent'>
						<!--PHP script-->
					</div>
					
					<div class='cardContact'>
						<!--PHP script-->
					</div>
					
					<div class='cardRating'>
						<!--PHP script-->
					</div>
			</div>";
			}
		?>
		
		<!--<div class="scrollList">
		</div>-->
		
		<!--<div class="scrollGallery">
			<div class="scrollItem"><h2 align="center">Top 4 Freelancers</h2></div>
			<!--Add PHP script to find top freelancers from the DB and show their profile pics
			<img class="scrollItem" src="img/topfreelancers/architect.jpg"/>
			<img class="scrollItem" src="img/topfreelancers/guitar.gif"/>
			<img class="scrollItem" src="img/topfreelancers/printer.gif"/>
			<img class="scrollItem" src="img/topfreelancers/puppeteer.gif"/>
		</div>-->
		
		<script>
			function accountTab() {
				document.getElementById("acc").style.display = "block";
			}
			
			function closeAccTab() {
				document.getElementById("acc").style.display = "none";
			}
			
			function editImage() {
				if (document.getElementById("edit").style.display == "none") {
					document.getElementById("edit").style.display = "block";
					document.getElementById("change").style.display = "none";
				} else {
					document.getElementById("edit").style.display = "none";
					document.getElementById("change").style.display = "block";
				}
			}
			
			function closeEditImage() {
				document.getElementById("edit").style.display = "none";
				document.getElementById("change").style.display = "block";
			}
		</script>
	</body>

</html>

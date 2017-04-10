<?php
	include 'loggedin.php';
	session_destroy(); // Is Used To Destroy All Sessions
	/*Or
	if(isset($_SESSION['login_user']))
	unset($_SESSION['login_user']);*/
?>
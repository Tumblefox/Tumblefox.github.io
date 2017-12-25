<?php
//Connection credentials
$server = "";
$user = "";
$pass = "";

$connection = mysqli_connect($server, $user, $pass);

if (!$connection) {
	die("Connection failed: " . mysqli_connect_error());
}

//Dynamically Prepared Insert Statement
function preparedInsert($table, $columns, $bindParams, $values) {
	$sql = "INSERT INTO " . $table . " (";
	$sqlEnd = "(";
	$count = count($columns);
	
	for($i = 0; $i < $count; $i++) {
		if ($i == $count - 1) {
			$sql .= $columns[$i];
			$sqlEnd .= "?";
		}
		else {
			$sql .= $columns[$i] . ",";
			$sqlEnd .= "?,";
		}
	}
	
	$sqlEnd .= ")"; 
	$sql .= ") VALUES " . $stmtEnd;
	
	$stmt = $connection->prepare($sql);
	
	$bind = "$stmt->bind_param($bindParams,";
	for($i = 0; $i < $count; $i++) {
		if ($i == $count - 1)
			$bind = $values[$i];
		else
			$bind = $values[$i] . ",";
	}
	$bind .= ")";
	eval($bind);
	
	$stmt->execute();
	$stmt->close();
	//$stmt->bind_param($bindParams, $firstname, $lastname, $email);
	//call_user_func_array(array($stmt, 'bind_param'), $a_params);
}
?>
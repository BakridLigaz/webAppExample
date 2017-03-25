<?php
// set up the connection variables
$db_name  = 'my_db';
$hostname = '127.0.0.1';
$username = 'user';
$password = 'root';

// connect to the database
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
return $dbh;
?>
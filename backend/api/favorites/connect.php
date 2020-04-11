<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
/******************************/
// More info on connecting PHP and DB
// http://www.cs.virginia.edu/~up3f/cs4640/supplement/connecting-PHP-DB.html

/******************************/
// connecting to DB on CS Server

// $host = 'cs4750.cs.virginia.edu';           // hostname
$dbname = 'sj4zm_cloutstack';     // database name

// database credentials
$username = 'sj4zm';
$password = '1Srideepthi2@';

// connecting to localhost DB

$host = 'localhost:3306';           // hostname

/******************************/

$dsn = "mysql:host=$host;dbname=$dbname";
$db = "";

/** connect to the database **/
try 
{
   $db = new PDO($dsn, $username, $password);   
//    $db = new mysqli($host, $username, $password, $dbname);
//    echo "<p>You are connected to the database</p>";
}
catch (PDOException $e)     // handle a PDO exception (errors thrown by the PDO library)
{
   // Call a method from any object, 
   // use the object's name followed by -> and then method's name
   // All exception objects provide a getMessage() method that returns the error message 
   $error_message = $e->getMessage();        
   echo "<p>An error occurred while connecting to the database: $error_message </p>";
}
catch (Exception $e)       // handle any type of exception
{
   $error_message = $e->getMessage();
   echo "<p>Error message: $error_message </p>";
}

?>
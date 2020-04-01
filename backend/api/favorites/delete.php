<?php
    require('connect.php');
    $data = file_get_contents("php://input");
    $data = json_decode($data);
    // $q=$_GET["q"];
    $query = "DELETE FROM favorite WHERE username='default' AND title=:title AND link=:link AND description=:description AND from_where=:from_where";
    $statement = $db->prepare($query);
    $statement->execute(array(
        ":title" => $data->title,
        ":link" => $data->link,
        ":description" => $data->description,
        ":from_where" => $data->from_where,
    ));
    $statement->closeCursor();
    include("read.php");
?>